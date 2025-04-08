const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TravelReser')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB:', err);
    });

const promotionRouter = require('./routes/promotionRouter');
const contactRouter = require('./routes/contactRouter');
const reviewRouter = require('./routes/reviewRouter');
const hotelRouter = require('./routes/hotelRouter');
const commentRouter = require('./routes/commentRouter');
const homeRouter = require('./routes/homeRouter')
const registerRouter = require('./routes/registerRouter')
const loginRouter = require('./routes/loginRouter')
const booksRouter = require('./routes/booksRouter')
const addcommentRouter = require('./routes/addcommentRouter')
const partnerRouter = require('./routes/partnerRouter')
const addHotelRouter = require('./routes/addHotelRouter')
const searchRouter = require('./routes/search')
const deleteRouter = require('./routes/delete')
const edit = require('./routes/editRouter')
app.use(edit)
app.use(deleteRouter)
app.use(searchRouter)
app.use(addHotelRouter)
app.use(partnerRouter)
app.use(addcommentRouter)
app.use(booksRouter)
app.use(loginRouter)
app.use(registerRouter);
app.use(homeRouter);
app.use(commentRouter);
app.use(hotelRouter);
app.use(promotionRouter);
app.use(contactRouter);
app.use(reviewRouter);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
