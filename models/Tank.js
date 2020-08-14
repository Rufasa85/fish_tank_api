module.exports = function(sequelize, DataTypes) {
    var Tank = sequelize.define('Tank', {
        name: DataTypes.STRING
    });

    Tank.associate = function(models) {
        Tank.hasMany(models.Fish);
        Tank.belongsTo(models.User);
    };

    return Tank;
};