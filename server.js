const express = require("express")
const mongoose = require("mongoose")
const pastryRoute = require("./routes/pastry")
const userRoute = require("./routes/user")
const bodyParser = require("body-parser")
require("dotenv").config()


const cors = require("cors")
const PORT = process.env.PORT || 5050

const app = express()
app.use(cors()) 
app.use(express.json());
app.use(bodyParser.json())
app.use("/", pastryRoute);
app.use("/", userRoute);


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

app.listen(PORT, ()=> console.log(`server running correctly on PORT ${PORT}`))