import mongoose from "mongoose";
import express from "express";
import cors from "cors";

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

mongoose.connect("mongodb://localhost:27017", {
  dbName: "webBooking",
})
.then((c)=> console.log(`Database connected with ${c.connection.host}`))
.catch((e) => console.log(e))

app.listen(4000, ()=>{
  console.log(`Server is working on port: 4000`);
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