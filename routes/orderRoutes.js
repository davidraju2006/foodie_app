const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Get all orders for delivery man
router.get('/delivery', auth, async (req, res) => {
  try {
    const orders = await Order.find({ 
      deliveryMan: req.deliveryMan._id 
    })
    .populate('restaurant customer')
    .sort('-createdAt');
    
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update order status
router.patch('/:id/status', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['status'];
  const isValidOperation = updates.every(update => 
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const order = await Order.findOne({
      _id: req.params.id,
      deliveryMan: req.deliveryMan._id
    });

    if (!order) {
      return res.status(404).send();
    }

    updates.forEach(update => order[update] = req.body[update]);
    await order.save();
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get order details
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      deliveryMan: req.deliveryMan._id
    }).populate('restaurant customer items.menuItem');

    if (!order) {
      return res.status(404).send();
    }

    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
