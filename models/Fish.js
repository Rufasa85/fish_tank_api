module.exports = function(sequelize, DataTypes) {
    var Fish = sequelize.define('Fish', {
        name:DataTypes.STRING,
        color:DataTypes.STRING,
        width:DataTypes.INTEGER
    });

    Fish.associate = function(models) {
        Fish.belongsTo(models.User);
        Fish.belongsTo(models.Tank);
    };

    return Fish;
};