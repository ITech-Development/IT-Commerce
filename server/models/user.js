'use strict';
const { hash } = require('../helpers/bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  User.init({
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
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
      allowNull: false,
      
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.TEXT,
    imageProfile: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(instance => {
    instance.password = hash(instance.password)
  })
  return User;
};