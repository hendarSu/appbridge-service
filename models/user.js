'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * function for encrypt password
     * @param {password} password 
     * @returns 
     */
    static #encript = (password) => bcrypt.hashSync(password, 10);

    /**
     * function fo registration
     * @param {fullname, email, password} 
     * @returns 
     */
    static registration = async ({ email, password, name }) => {
      const passwordHash = this.#encript(password);
      return await this.create({
        email, password: passwordHash, name
      })
    }

    static checkPassword = (password, passwordHash) => bcrypt.compareSync(password, passwordHash);

    /**
     * @deprecated 
     * @returns 
     */
    static generateToken = async () => {
      const payload = {
        id: this.id,
        username: this.email
      }

      return jwt.sign(payload, process.env.SECRETTOKEN);
    }

    static generateTokenV2 = async ({ id, email, name }) => {
      const payload = {
        sub: "payload",
        usr: {
          id: id,
          email: email,
          name: name
        }
      }

      return jwt.sign(payload, process.env.SECRETTOKEN, { expiresIn: '1h' });
    }

    static authenticateToken = async ({ email, password }) => {
      try {
        const user = await this.findOne({
          where: { email: email }
        });

        if (!user) return Promise.reject("User tidak terdaftar!");

        const isPasswordValid = this.checkPassword(password, user.password);
        if (!isPasswordValid) return Promise.reject("Password tidak Sesuai!");

        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    static authenticateGoogleToken = async ({ email }) => {
      try {
        const user = await this.findOne({
          where: { email: email }
        });

        if (!user) return Promise.reject("User tidak terdaftar!");

        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};