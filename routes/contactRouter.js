const express = require('express');
const router = express.Router();
const Contact = require('../modules/contactModule');

router.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

router.post('/contact', (req, res) => {
    const { firstname, lastname, email, phone, message } = req.body;
  
    // สร้างเอกสารใหม่ใน MongoDB
    const newContact = new Contact({
      firstname,
      lastname,
      email,
      phone,
      message
    });
  
    // บันทึกข้อมูลลงใน MongoDB
    newContact.save()
      .then(() => {
        res.render('contact.ejs');
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

module.exports = router;