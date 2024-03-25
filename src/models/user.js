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
    toSafeObject() {
      return { this: { id, userName, email } }
    };

    validatePassword(password) {
      return bcrypt.compareSync(password, this.password.toString());
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: { userName: credential, email: credential }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
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

    defaultScope: {
      attributes: {
        exclude: ['password', 'updatedAt', 'email', 'createdAt']
      }
    },
    scopes: {
      loginUser: {
        attributes: {}
      },
      currentUser: {
        attributes: { exclude: ['password', 'updatedAt', 'createdAt'] }
      }
    }
  });
  return User;
};
