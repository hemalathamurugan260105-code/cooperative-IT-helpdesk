const express=require("express");

const cors=require("cors");


const app=express();


app.use(cors());

app.use(express.json());



app.use(
"/api/auth",
require("./routes/authRoutes")
);



app.use(
"/api/tickets",
require("./routes/ticketRoutes")
);

// Home route

app.get("/",(req,res)=>{

res.json({
message:"Helpdesk API Running"
});

});



module.exports=app;