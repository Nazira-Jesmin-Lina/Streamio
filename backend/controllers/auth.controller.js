import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { genrateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req,res) {
    try {
        const {email,password,username}=req.body;
        console.log(email,password,username);
        if(!email || !password || !username){
            return res.status(400).json({success:false,message:"All feilds are required"});
        }

        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message:"Invalied mail"});
        }

        if(password.length<6){
            return res.status(400).json({success:false,message:"Password must be at least 6 charecter"});
        }

        const existingUserByEmail =await User.findOne({email:email})

        if(existingUserByEmail){
            return res.status(400).json({success:false,message:"User with this email already exist"});
        }


        const existingUserByUsername =await User.findOne({username:username})
       

        if(existingUserByUsername){
            return res.status(400).json({success:false,message:"User with this Username already exist"});
        }

       
        const salt= await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        const PROFILE_PICS = ["/avatar1.png"];

		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];


        const newUser= new User({
            email,   
            password :hashedPassword,
            username,
            image,
        })

        genrateTokenAndSetCookie(newUser._id,res);
        await newUser.save();

        res.status(201).json({success:true,user:{
        ...newUser._doc,
        password:""
    },
});
        


        

    } catch (error) {
        console.log("Error in Signup controller:",error.message)
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function login(req,res) {
    try {
        
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"All field are required"});

        }

        const user= await User.findOne({email:email});
        if(!user){
            return res.status(404).json({success:false,message:"Invalied Credential"});
        }

        const isPasswordCorrect=await bcryptjs.compare(password,user.password)

        if(!isPasswordCorrect){
            return res.status(404).json({success:false,message:"Invalied Credential"});
        }


        genrateTokenAndSetCookie(user._id,res);
        

        res.status(200).json({success:true,user:{
        ...user._doc,
        password:"",
    },
});

    } catch (error) {
        console.log("Error in login controller:",error.message)
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function logout(req,res) {

    try {
        res.clearCookie("jwt-streamio");
        res.status(200).json({success:true,message:"Logged Out successfully"});
    } catch (error) {
        console.log("Error in logout controller:",error.message)
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}


export async function authCheck(req,res) {
    try {
        console.log("res.req:",res.req);
        res.status(200).json({success:true,user:req.user});

    } catch (error) {
        console.log("Error in authcheck",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}