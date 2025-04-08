const express = require('express');
const router = express.Router();
const Hotel = require('../modules/hotelModule');
router.get('/search', async (req, res) => {
    const query = req.query.query?.toLowerCase(); // คำที่ค้นหา
    try {
        // ดึงโรงแรมทั้งหมดจาก MongoDB
        const hotels = await Hotel.find();
        
        // ค้นหาโรงแรมที่มีชื่อหรือที่อยู่ใกล้เคียง
        const filteredHotels = hotels.filter(hotel =>
            hotel.name.toLowerCase().includes(query) ||
            hotel.address.toLowerCase().includes(query)
        );

        res.render('research', { query, hotels: filteredHotels }); // ส่งไปที่ searchResults.ejs
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving search results');
    }
});

module.exports = router