const allRoles = {
  CLIENT: ['createPropertyRequest', 'updatePropertyRequest'],

  AGENT: ['createAd'],

  ADMIN: ['matchPropertyRequest', 'getStats'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
