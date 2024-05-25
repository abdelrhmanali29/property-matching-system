const { User } = require('../models');

const getStats = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const statsPipeline = [
      {
        $lookup: {
          from: 'ads',
          localField: '_id',
          foreignField: 'user',
          as: 'ads',
        },
      },
      {
        $lookup: {
          from: 'propertyrequests',
          localField: '_id',
          foreignField: 'user',
          as: 'requests',
        },
      },
      {
        $addFields: {
          adsCount: { $size: '$ads' },
          totalAdsAmount: { $sum: '$ads.price' },
          requestsCount: { $size: '$requests' },
          totalRequestsAmount: { $sum: '$requests.price' },
        },
      },
      {
        $project: {
          name: 1,
          role: 1,
          phone: 1,
          status: 1,
          adsCount: 1,
          totalAdsAmount: 1,
          requestsCount: 1,
          totalRequestsAmount: 1,
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: parseInt(limit, 10) }],
          totalCount: [{ $count: 'count' }],
        },
      },
    ];

    const result = await User.aggregate(statsPipeline);

    const users = result[0].data;
    const totalUsers = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;

    const totalPages = Math.ceil(totalUsers / limit);

    res.send({
      data: users,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total: totalUsers,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getStats,
};
