const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");



// JWT Token

const generateToken=(id)=>{

    return jwt.sign(
        {
            id:id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    );

};




// REGISTER

exports.register = async(req,res)=>{

try{

    const {
        name,
        email,
        password
    } = req.body;



    const existUser =
    await User.findOne({email});


    if(existUser){

        return res.status(400).json({
            message:"User already exists"
        });
    }



    const hashPassword =
    await bcrypt.hash(password,10);



    const user =
    await User.create({

        name,

        email,

        password:hashPassword

        // role default user

    });

    res.status(201).json({

        message:"Account Created Successfully!",

        user:{
            name:user.name,
            email:user.email,
            role:user.role
        }

    });


    

}
catch(error){

res.status(500).json({
message:error.message
});

}


};






// LOGIN


exports.login = async(req,res)=>{


try{


const {
email,
password
}=req.body;



const user =
await User.findOne({email});


if(!user){

return res.status(404).json({
message:"User not found"
});

}



const checkPassword =
await bcrypt.compare(
password,
user.password
);



if(!checkPassword){

return res.status(401).json({
message:"Invalid password"
});

}




const token =
generateToken(user._id);



res.json({

message:"Login Success",

token,


user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
}


});


}
catch(error){

res.status(500).json({
message:error.message
});

}


};