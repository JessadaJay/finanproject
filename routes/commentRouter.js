const express = require('express');
const router = express.Router();
const Comment = require('../modules/commentModule');

// API สำหรับเพิ่มความคิดเห็น
router.post('/addcomment', (req, res) => {
  const { email, rating, review } = req.body;

  // สร้างเอกสารใหม่ใน MongoDB
  const newComment = new Comment({
    email,
    rating,
    review
  });

  // บันทึกข้อมูลลงใน MongoDB
  newComment.save()
    .then(() => {
      res.status(201).json({ message: 'Comment added successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// API สำหรับดึงข้อมูลความคิดเห็นทั้งหมด
router.get('/comments', (req, res) => {
  // ดึงข้อมูลความคิดเห็นทั้งหมดจาก MongoDB
  Comment.find()
    .sort({ date: -1 })  // เรียงลำดับจากวันที่ล่าสุด
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
