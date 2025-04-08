const express = require('express');
const router = express.Router();
const Hotel = require('../modules/hotelModule');
const Review = require('../modules/commentModule');
const Booking = require('../modules/BookingNumberModul');
// Define the route to handle GET request for /books/:hotelName
router.get('/books/:hotelName', async (req, res) => {
    try {
        const hotelName = req.params.hotelName; // Get the hotel name from the URL parameter
        // Fetch hotel data from DB
        const hotel = await Hotel.findOne({ name: hotelName });

        // If no hotel is found, send 404 error
        if (!hotel) {
            return res.status(404).send('Hotel not found');
        }
        console.log(hotel._id.toString());  // Log the hotelId (for debugging purposes)

        // Fetch reviews associated with the hotel using the hotel's _id
        const reviews = await Review.find({ hotelId: hotel._id.toString() }).limit(5);

        // Log reviews (for debugging purposes)
        console.log(reviews);

        // Render a page with the hotel details and reviews
        res.render('books.ejs', { hotel: hotel, reviews: reviews });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving hotel data');
    }
});
router.post('/booking', async (req, res) => {
    const {
        BookingNumber,
        name,
        telNum,
        hotelName,
        checkIn,
        checkOut,
        roomType,
        roomPrice,
        totalPriceP,
        
    } = req.body;

    console.log("📥 รับข้อมูลจาก client:", req.body);
    console.log(hotelName)
    try {
        // ตรวจสอบว่าข้อมูลครบหรือไม่
        if (!BookingNumber || !name || !telNum || !checkIn || !checkOut || !roomType || !roomPrice || !totalPriceP) {
            return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" });
        }
        console.log(111)
        const booking = new Booking({
            BookingNumber,
            name,
            telNum,
            hotelName,
            checkIn,
            checkOut,
            roomType,
            roomPrice,
            totalPriceP,
        });

        await booking.save();

        res.status(201).json({ message: "บันทึกข้อมูลสำเร็จ!", booking });
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
});

// Assuming this is in your Express route handler
router.post('/getBooking', async (req, res) => {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      
      // Find all bookings for this name
      const bookings = await Booking.find({ name });
      
      res.json({ 
        success: true, 
        bookings: bookings,
        // For backward compatibility
        bookingNumbers: bookings.map(booking => booking.BookingNumber)
      });
      
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Failed to fetch booking information' });
    }
  });

  router.post('/getBookings', async(req, res) => {
    const {hotelName,name} = req.body;
    const bookings = await Booking.find({hotelName: hotelName})
    console.log(bookings)
    res.json({ success: true, bookings: bookings })
});
module.exports = router;