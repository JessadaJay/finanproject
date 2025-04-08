const express = require('express');
const router = express.Router();
const Hotel = require('../modules/hotelModule'); // นำเข้าโมเดลโรงแรม

router.delete('/deletePartnerHotel', async (req, res) => {
    try {
        const { hostname,name } = req.body; // ✅ เช็ค req.body
        console.log(name)
        if (!hostname) {
            return res.status(400).json({ success: false, message: "Missing hostname" });
        }

        // ✅ แก้เงื่อนไขให้ลบได้เฉพาะของเจ้าของที่ล็อกอิน
        const deletedHotel = await Hotel.findOneAndDelete({ name: name, hostname: hostname });

        if (!deletedHotel) {
            return res.status(404).json({ success: false, message: "Hotel not found or unauthorized" });
        }

        res.json({ success: true, message: "Hotel deleted successfully" });
    } catch (error) {
        console.error("Error deleting hotel:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
