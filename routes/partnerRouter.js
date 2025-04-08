// routes/hotelRouter.js

const express = require('express');
const router = express.Router();
const Hotel = require('../modules/hotelModule');  // เชื่อมโยงกับโมเดลของโรงแรม

router.get('/partner/:hostname', async (req, res) => {
    const hostname = req.params.hostname
    try {
        // ดึงข้อมูลโรงแรมทั้งหมดจากฐานข้อมูล
        const hotels = await Hotel.find({hostname: hostname});
        console.log(hostname) // ดึงข้อมูลทั้งหมดจากฐานข้อมูล
        res.render('partner', { hotels: hotels });  // ส่งข้อมูลไปยังหน้า EJS
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving hotels data');
    }
});

module.exports = router;
