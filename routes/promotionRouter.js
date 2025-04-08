const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Coupon = require('../modules/couponModule');

router.post('/addcoupons', (req, res) => {
    const { discount, code, nights } = req.body;
    console.log('Request body:', req.body);
    const newCoupon = new Coupon({
        discount,
        code,
        nights
    });
    newCoupon.save()
        .then(() => {
            console.log('Coupon added successfully');
            res.status(201).json({ message: 'Coupon added successfully' });
        })
        .catch(err => {
            console.error('Error saving coupon:', err);
            res.status(500).json({ error: err.message });
        });
});
router.get('/promotion', (req, res) => {
    // Fetch coupons from MongoDB
    Coupon.find()
        .then(coupons => {
            res.render('promotion.ejs', { coupons });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error fetching coupons');
        });
});
module.exports = router;