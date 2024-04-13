import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import crypto from 'crypto';
import Razorpay from 'razorpay';
config();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});

const schema = new mongoose.Schema({
  name: String,
  phone: String,
})

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
)

const Book = mongoose.model("WebDevBooking", schema);

mongoose.connect(process.env.MONGO_URI, {
  dbName: "webBooking",
})
.then((c)=> console.log(`Database connected with ${c.connection.host}`))
.catch((e) => console.log(e))

app.listen(process.env.PORT, ()=>{
  console.log(`Server is working on port: ${process.env.PORT}`);
});

app.post("/demo", async (req, res)=>{
  const {name, phone} = req.body;
  try {
    await Book.create({ name, phone });
    res.redirect(`${process.env.FRONTEND_URL}`);
  } catch (error) {
    console.error('Error saving user:', error);
  }  
} )

app.get('/', async (req, res) => {
  res.send("This is not the main site, it is just the backend.");
})

app.get('/getkey', (req, res)=>{
  res.status(200).json({key: process.env.RAZORPAY_API_KEY});
})

app.post('/checkout', async (req, res) => {
  const options = {
    amount : Number(req.body.amount * 100),
    currency: "INR", 
  };
  let order = "";
  try{
    order = await instance.orders.create(options);
  }
  catch(error){
    console.error('Facing some technical issue:', error);
  }
  res.status(200).json({
    success: true,
    order
  });
})

app.post('/paymentverification', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex');
  const isAuthentic = expectedSignature === razorpay_signature;
  if(isAuthentic){ 
    res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess/${razorpay_payment_id}`);
  } else{
    res.status(400).json({
      success: false
    })
  }
})