
module.exports = {
    internalTokenMw: require('./internal.service.middleware'),
    userMw: require('./user.middleware'),
    scoreMw: require('./score.middleware'),
}