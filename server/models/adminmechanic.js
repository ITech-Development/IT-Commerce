'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class AdminMechanic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminMechanic.init({
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: { message: 'Full Name must be unique' },
      validate: {
        notEmpty: { msg: 'Full Name is required' },
        notNull: { msg: 'Full Name is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { message: 'Email must be unique' },
      validate: {
        isEmail: { msg: 'Invalid email format' },
        notEmpty: { msg: 'Email is required' },
        notNull: { msg: 'Email is required' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    imageProfile: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AdminMechanic',
  });
  AdminMechanic.beforeCreate(instance => {
    instance.password = hash(instance.password)
  })
  return AdminMechanic;
};