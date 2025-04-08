const express = require('express');
const router = express.Router();
const Hotel = require('../modules/hotelModule');
const Review = require('../modules/commentModule'); // ใช้ Review ที่ import

// ดึงหน้าให้กรอกรีวิว
router.get('/comment/:hotelName', async (req, res) => {
    try {
        const hotelName = req.params.hotelName;
        const hotel = await Hotel.findOne({ name: hotelName });

        if (!hotel) {
            return res.status(404).send("ไม่พบโรงแรมที่ต้องการรีวิว");
        }

        res.render("addcomment.ejs", { hotel });
    } catch (error) {
        res.status(500).send("เกิดข้อผิดพลาดในเซิร์ฟเวอร์");
    }
});

// API รับรีวิวจาก frontend
router.post("/comment/:hotelName", async (req, res) => {
    try {
        const { rating, review } = req.body;
        const hotelName = req.params.hotelName;
        const email = req.headers["x-user-email"]; // รับ email จาก header ที่ส่งมาจาก localStorage

        if (!email) {
            return res.status(400).json({ error: "กรุณาเข้าสู่ระบบก่อนรีวิว" });
        }

        // ค้นหา hotelId จากชื่อโรงแรม
        const hotel = await Hotel.findOne({ name: hotelName });

        if (!hotel) {
            return res.status(404).json({ error: "ไม่พบโรงแรมที่ต้องการรีวิว" });
        }

        // สร้างข้อมูลคอมเมนต์ใหม่
        const newReview = new Review({
            email,
            rating,
            review,
            hotelId: hotel._id // ใช้ hotel._id
        });

        // บันทึกรีวิวใหม่ลงในฐานข้อมูล
        await newReview.save();

        // คำนวณค่าเฉลี่ยใหม่ของ rating สำหรับโรงแรม
        const reviews = await Review.find({ hotelId: hotel._id }); // ดึงรีวิวทั้งหมดของโรงแรมนี้
        const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

        // อัพเดตค่า rating ของโรงแรม
        hotel.rating = averageRating;
        await hotel.save();

        res.status(201).json({ message: "บันทึกรีวิวเรียบร้อยแล้ว!" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์", details: error.message });
    }
});

module.exports = router;
