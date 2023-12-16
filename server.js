const express = require("express")
const mongoose = require("mongoose")
const pastryRoute = require("./routes/pastry")
const userRoute = require("./routes/user")
const blogUsersRoute = require("./routes/blogUsers")
const bodyParser = require("body-parser")
const cron = require('node-cron');
require("dotenv").config()
const Pastry = require('./models/pastry');


const cors = require("cors")
const PORT = process.env.PORT || 5050

const app = express()
app.use(cors()) 
app.use(express.json());
app.use(bodyParser.json())
app.use("/", pastryRoute);
app.use("/", userRoute);
app.use("/", blogUsersRoute)


mongoose.set("strictQuery", false)
mongoose.connect(process.env.DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error",
    console.error.bind(console, "errore di connessione")
)
db.once("open", ()=>{
    console.log("database connected")
})

// PUNTO 5 Il quarto giorno non
// sono commestibili e devono essere ritirati dalla vendita.

//commented out
// cron.schedule('0 0 * * *', async () => {
//     const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  
//     try {
//       const result = await Pastry.deleteMany({
//         createdAt: { $lte: threeDaysAgo }
//       });
  
//       console.log('Deleted old pastries:', result.deletedCount);
//     } catch (err) {
//       console.error('Error deleting old pastries:', err);
//     }
//   });
  

app.listen(PORT, ()=> console.log(`server running correctly on PORT ${PORT}`))