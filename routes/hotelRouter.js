const express = require('express');
const router = express.Router();
const Hotel = require('../modules/hotelModule');

router.post('/addhotel', (req, res) => {
    const { imageLink, name, price, address, details, rating } = req.body;

    const newHotel = new Hotel({
        imageLink,
        name,
        price,
        address,
        details,
        rating
    });

    newHotel.save()
        .then(() => {
            res.status(201).json({ message: 'Hotel information saved successfully' });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;
