const { User, Ad, PropertyRequest } = require('../models');

const createAd = async (data) => {
  const user = await User.findById(data.user);
  if (!user || user.role !== 'AGENT') {
    throw new Error('Only agents can create ads.');
  }

  const ad = new Ad(data);
  await ad.save();
  return ad;
};

const findById = async (id) => {
  const ad = await Ad.findById(id);

  if (!ad) {
    throw new Error('Ad not found.');
  }

  return ad;
};

const matchPropertyRequests = async (adId, page = 1, limit = 10) => {
  const ad = await Ad.findById(adId);

  const skip = (page - 1) * limit;
  const priceTolerance = 0.1;
  const minPrice = ad.price * (1 - priceTolerance);
  const maxPrice = ad.price * (1 + priceTolerance);

  const matchCriteria = {
    district: ad.district,
    area: { $gte: ad.area },
    price: { $gte: minPrice, $lte: maxPrice },
  };

  const matchPipeline = [
    {
      $match: matchCriteria,
    },
    {
      $facet: {
        data: [
          { $sort: { refreshedAt: -1 } },
          { $skip: skip },
          { $limit: parseInt(limit, 10) },
        ],
        totalCount: [{ $count: 'count' }],
      },
    },
  ];

  const result = await PropertyRequest.aggregate(matchPipeline);

  const matchedRequests = result[0].data;
  const totalRequests = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;

  const totalPages = Math.ceil(totalRequests / limit);

  return {
    data: matchedRequests,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    total: totalRequests,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

module.exports = {
  createAd,
  findById,
  matchPropertyRequests,
};
