// routes/hotelRouter.js

const express = require('express');
const router = express.Router();
const Hotel = require('../modules/hotelModule');  // เชื่อมโยงกับโมเดลของโรงแรม

router.get('/home', async (req, res) => {
    try {
        // ดึงข้อมูลโรงแรมทั้งหมดจากฐานข้อมูล
        const hotels = await Hotel.find().limit(3); // ดึงข้อมูลทั้งหมดจากฐานข้อมูล
        const hotel = await Hotel.find().limit();
        res.render('home', { hotels: hotels,hotel: hotel }); 
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving hotels data');
    }
});
router.get('/home1', async (req, res) => {
    try {
        const hotels = await Hotel.find().limit();
        console.log(hotels)
        return res.json(hotels);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error retrieving hotels data' });
    }
});

module.exports = router;
