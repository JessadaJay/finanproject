const express = require('express');
const router = express.Router();
const Hotel = require('../modules/hotelModule')
router.get('/addHotel', async (req, res) => {
    res.render("addHotel.ejs");
});
router.post('/addHotel',async(req,res)=>{
    const hotel = new Hotel(req.body);
        
        // Save the hotel to the database
        await hotel.save();
        res.json({message: "success"})
})
module.exports = router