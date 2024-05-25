const cron = require('node-cron');
const PropertyRequest = require('../../models/propertyRequest.model');

cron.schedule('0 0 */3 * *', async () => {
  try {
    const result = await PropertyRequest.updateMany(
      {},
      { $set: { refreshedAt: new Date() } }
    );
    console.log(`Successfully refreshed ${result.nModified} property requests`);
  } catch (error) {
    console.error('Error refreshing property requests:', error);
  }
});
