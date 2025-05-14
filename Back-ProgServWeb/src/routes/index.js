const unprotectedRoutes = require('./public');
const protectedRoutes = require('./private');

module.exports = {
    unprotectedRoutes,
    protectedRoutes
};