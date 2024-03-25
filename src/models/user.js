'use strict';
const {
  Model, UUIDV4, Sequelize
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
      User.hasOne(models.Preference)
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: { isUUID: 4 }
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter firstname' }
      }
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter lastname' }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: { msg: 'Email is already taken' },
      validate: {
        isEmail: { msg: 'Please use the correct email format: `user@example.com`' }
        // notNull: { msg: 'Please enter your email' }
      }
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter your username' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Enter a password' },
        len: {
          args: [8, Infinity],
          msg: 'The Password must be 8+ characters long'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
