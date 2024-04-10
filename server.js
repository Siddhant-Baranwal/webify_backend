import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

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

console.log(process.env.PORT)
console.log(process.env.MONGO_URI)

const Book = mongoose.model("WebDevBooking", schema);

mongoose.connect(process.env.MONGO_URI, {
  dbName: "webBooking",
})
.then((c)=> console.log(`Database connected with ${c.connection.host}`))
.catch((e) => console.log(e))

app.listen(process.env.PORT, ()=>{
  console.log(`Server is working on port: ${process.env.PORT}`);
});

app.post("/", async (req, res)=>{
  const {name, phone} = req.body;
  console.log(`${name} and ${phone}`);
  try {
    await Book.create({ name, phone });
    res.send('Booking confirmed successfully.')
  } catch (error) {
    console.error('Error saving user:', error);
  }  
} )