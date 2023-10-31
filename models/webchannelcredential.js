'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class webChannelCredential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  webChannelCredential.init({
    key_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    consumer_key: DataTypes.STRING,
    consumer_secret: DataTypes.STRING,
    key_permissions: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'webChannelCredential',
  });
  return webChannelCredential;
};