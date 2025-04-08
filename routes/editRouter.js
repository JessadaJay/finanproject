const express = require('express');
const router = express.Router();
const Hotel = require('../modules/hotelModule');

router.get('/edit',(req,res)=>{
    res.render('edit')
})
router.put("/edit1", async (req, res) => {
    const { data, name } = req.body;  // รับข้อมูลจาก body

    try {
        // ค้นหาข้อมูลโรงแรมตามชื่อที่ส่งมา (ชื่อเดิมจาก localStorage)
        const hotel = await Hotel.findOne({ name: name });

        if (!hotel) {
            return res.status(404).json({ error: "Hotel not found" });
        }

        // อัพเดตข้อมูลโรงแรม
        hotel.imageLink = data.imageLink;
        hotel.name = data.name;
        hotel.price = data.price;
        hotel.address = data.address;
        hotel.details = data.details;
        hotel.rating = data.rating;
        hotel.rooms = data.rooms;

        // อัพเดตข้อมูลในฐานข้อมูล
        const updatedHotel = await hotel.save();

        // ส่งผลลัพธ์กลับไปยัง client
        res.status(200).json({ message: "Hotel updated successfully", hotel: updatedHotel });
    } catch (error) {
        console.error("Error updating hotel:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router