require('dotenv').config();
const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));

app.use('/user', require('./routes/userRouter'));

const url = process.env.URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected');
})

app.get('/', (req, res) => {
    res.json({msg: 'DONE'});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
});