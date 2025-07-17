const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:INTEGER,
        allowNull:false,
    },
  });

  User.associate = models => {
    User.hasMany(models.ChatMessage, { foreignKey: 'senderId', as: 'sentMessages' });
    User.hasMany(models.ChatMessage, { foreignKey: 'receiverId', as: 'receivedMessages' });
  };

  return User;
};
