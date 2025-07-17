
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);


app.get('/', (req, res) => res.send('API is running'));
sequelize.sync();
app.post('/test-json', (req, res) => {
  console.log('Test JSON body:', req.body);
  res.json({ received: req.body });
});

module.exports = app;
