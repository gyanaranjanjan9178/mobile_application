
module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  ChatMessage.associate = models => {
    ChatMessage.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
    ChatMessage.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
  };

  return ChatMessage;
};
