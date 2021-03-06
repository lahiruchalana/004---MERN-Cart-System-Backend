import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import Cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'



import userRouter from './routes/userRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import upload from './routes/upload.js';
import productRouter from './routes/productRouter.js';
import paymentRouter from './routes/paymentRouter.js';

import { join } from 'path'

/////end of Router setting (often what we change here)

// import express, { json, static } from 'express'
// import { connect } from 'mongoose'
// import cors from 'cors'
// import fileUpload from 'express-fileupload'
// import cookieParser from 'cookie-parser'
// import { join } from 'path'


// const app = express()
// app.use(json())
// app.use(cookieParser())
// app.use(cors())
// app.use(fileUpload({
//     useTempFiles: true
// }))

// Routes
// app.use('/user', require('./routes/userRouter'))
// app.use('/api', require('./routes/categoryRouter'))
// app.use('/api', require('./routes/upload'))
// app.use('/api', require('./routes/productRouter'))
// app.use('/api', require('./routes/paymentRouter'))



// Connect to mongodb
// const URI = process.env.MONGODB_URL
// connect(URI, {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, err =>{
//     if(err) throw err;
//     console.log('Connected to MongoDB')
// })



if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(join(__dirname, 'client', 'build', 'index.html'))
    })
}




// app configuration
const app = express();
// const port = process.env.PORT || 5000;
// const connection_url = 'mongodb+srv://admin:sVrpkHTK7rq2H6p5@cluster0.jtn9y.mongodb.net/weddingslk-db?retryWrites=true&w=majority';

// API endpoint
app.get('/', (req, res) => res.status(200).send("Success, you are in WeddingsLK"));

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})


// listner
// app.listen(port, () => console.log(`listening on localhost: ${port}`));

// DB configuration
// mongoose.connect(connection_url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// });

mongoose.connection.once('open', () => (
    console.log('DB Connected')
))

////////////////////////////////for what this is?//////////////////
mongoose.set('useFindAndModify', false);
///////////////////////////////////////////////////////////////////


// middlewares
app.use(express.json());
app.use(Cors());
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))




// app.use('/user', require('./routes/userRouter'))
// app.use('/api', require('./routes/categoryRouter'))
// app.use('/api', require('./routes/upload'))
// app.use('/api', require('./routes/productRouter'))
// app.use('/api', require('./routes/paymentRouter'))

//////start of Router setting (often what we change here)


app.use('/user', userRouter);
app.use('/api', categoryRouter);
app.use('/api', upload);
app.use('/api', productRouter);
app.use('/api', paymentRouter);


/////end of Router setting (often what we change here)

const URI = process.env.MONGODB_URL

mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

