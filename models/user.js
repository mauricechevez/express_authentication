'use strict';
const bcrypt = require('bcrypt')

const {
  Model, STRING
} = require('sequelize');
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
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
       len: {
        args: [1,99],
        msg: 'Name must be between 1 and 99 characters'
       }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          msg: 'Invalid Email'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[8,99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
// Hash the password using the bsync library
user.addHook('beforeCreate', (pendingUser) =>{
  let hash = bcrypt.hashSync(pendingUser.password, 12)
  pendingUser = hash // this hashed pw goes to the DB
})
user.prototype.validPassword = function(typedPassword){
  let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password)
  return isCorrectPassword;
}
// return an object from the DB of the user model, without the hashed pw.

user.prototype.toJSON = function(){
    let userData = this.get()
    delete userData.password;
  return userData
}

  return user;
};