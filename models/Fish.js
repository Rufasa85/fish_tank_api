module.exports = function(sequelize, DataTypes) {
    var Fish = sequelize.define('Fish', {
        name:DataTypes.STRING,
        color:DataTypes.STRING,
        width:DataTypes.INTEGER
    });

    Fish.associate = function(models) {
        // add associations here
        // ex:Fish.hasMany(models.BlogPost);
    };

    return Fish;
};