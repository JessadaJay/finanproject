const express = require('express');
const router = express.Router();
const Review = require('../modules/commentModule'); // เชื่อมต่อกับโมเดลของรีวิว
const Hotel = require('../modules/hotelModule');   // เชื่อมต่อกับโมเดลของโรงแรม

// หน้ารีวิว
router.get('/review/:hotelName', async(req, res) => {
    const hotelName = req.params.hotelName;
    const hotel = await Hotel.findOne({ name: hotelName });
    if (!hotel) {
        return res.status(404).send("Hotel not found");
    }
    const reviews = await Review.find({ hotelId: hotel._id.toString() });
    res.render('review.ejs', { hotel, reviews });
});


module.exports = router;
