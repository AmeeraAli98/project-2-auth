'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.submission.belongsTo(models.session)

    }
  }
  submission.init({
    uploader: DataTypes.STRING,
    sessionId: DataTypes.INTEGER,
    mime_type: DataTypes.STRING,
    file_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'submission',
  });
  return submission;
};