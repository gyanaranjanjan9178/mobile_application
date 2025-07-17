
const { ChatMessage, User } = require('../models');
const { Op } = require('sequelize');

exports.getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.findAll({
      where: {
        senderId: req.user.id
      },
      include: [
        { model: User, as: 'receiver', attributes: ['id', 'name'] },
        { model: User, as: 'sender', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.getReceivedMessages = async (req, res) => {
  try {
    const receiverId = req.user.id; // Make sure req.user is available via middleware

    const messages = await ChatMessage.findAll({
      where: { receiverId },
      include: [{ model: User, as: 'sender', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ messages });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.id; 

    if (!receiverId || !message) {
      return res.status(400).json({ error: 'Receiver ID and message are required' });
    }

    const newMessage = await ChatMessage.create({
      senderId,
      receiverId,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage,
    });

  } catch (error) {
    console.error('Send message error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await ChatMessage.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      include: [
        { model: User, as: 'sender', attributes: ['id', 'name'] },
        { model: User, as: 'receiver', attributes: ['id', 'name'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ success: true, history: messages });

  } catch (error) {
    console.error('Chat history error:', error);
    return res.status(500).json({ error: 'Failed to load chat history' });
  }
};
