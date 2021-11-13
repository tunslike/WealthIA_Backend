require("dotenv").config();
const express = require("express");

const app = express();
 
app.get("/api", (req, res) => {
    res.json({
        success: 1,
        message: "This is a rest aps working"
    })
})


app.listen(process.env.PORT, () => {
    console.log("Server is running on Port :", process.env.PORT);
});