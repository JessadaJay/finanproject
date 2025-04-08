const express = require('express');
const User = require('../modules/registerModule');

const router = express.Router();

router.get('/register', async (req, res) => {
    res.render("register.ejs");
});

router.post('/register', async (req, res) => {
    const { email, password, name, lastname, role } = req.body;
    
    // Ensure all required fields are present
    if (!email || !password || !name || !lastname || !role) {
        return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
    }


    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "อีเมลนี้ถูกใช้งานแล้ว" });
        }

        // Create a new user with the provided details
        const newUser = new User({ email, password, name, lastname, role });
        await newUser.save();

        res.status(201).json({ message: "ลงทะเบียนสำเร็จ" });
    } catch (error) {
        res.status(500).json({ error: "เกิดข้อผิดพลาด" });
    }
});

module.exports = router;
