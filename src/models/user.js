'use strict';
const { Op } = require('sequelize');
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
    toSafeObject() {
      return { this: { id, userName, email } }
    };

    validatePassword(password) {
      const bcrypt = require('bcryptjs');
      return bcrypt.compareSync(password, this.password.toString());
    }

    static async login({ credential, password }) {
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: { userName: credential, email: credential }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup(payLoad) {
      console.log(payLoad)
      const { firstName, lastName, email, userName, password, role } = payLoad;
      let user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: { userName, email }
        }
      });
      if (user) {
        if (user.userName === userName) return 'userName exists';
        else if (user.email === email) return 'Email already exists';
      }
      const newUser = await User.create({ firstName, lastName, email, userName, password, role });
      return await User.scope('currentUser').findByPk(newUser.id);
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
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { msg: 'User already exists with this username' },
      validate: {
        notNull: { msg: 'Please enter your username' }
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
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
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
