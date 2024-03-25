'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Preference.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      )
    }
  }
  Preference.init({
    language: DataTypes.STRING,
    emailNotification: DataTypes.BOOLEAN,
    browserNotification: DataTypes.BOOLEAN,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Preference',
  });
  return Preference;
};