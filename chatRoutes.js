const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.post('/send', authMiddleware, chatController.sendMessage);
router.get('/received', authMiddleware, chatController.getReceivedMessages);
router.get('/messages/:receiverId', authMiddleware, chatController.getMessages);
router.get('/history', authMiddleware, chatController.getChatHistory);

module.exports = router;
