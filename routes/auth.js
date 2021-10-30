const router=require('express').Router();
const User=require("../models/User")
const CryptoJS=require('crypto-js');
const jwt=require('jsonwebtoken');
//Register
router.post("/register", async (req,res)=>
{
    const newUser=new User(
        {
            username:req.body.username,
            email:req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
            isAdmin:req.body.isAdmin
        });
        try {

            const savedUser= await newUser.save();
            res.status(201).json(savedUser);
            
        } catch (err) {
          res.status(500).json(err);
        } 
    
})
// // {
//     "username":"Admin0013",
//     "email":"Admin0013@gmail.com",
//     "password":"1(*!4@#0",
//     "isAdmin":true
// }

router.post("/login", async (req,res)=>
{
try {
    const user=await User.findOne({username:req.body.username})
    !user && res.status(401).json("wrong Creditials");

    const hashedPassword= CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC);
        
        const originalPassword=hashedPassword.toString(CryptoJS.enc.Utf8)
        
        originalPassword!==req.body.password &&
        res.status(401).json("Wrong credetials");

        const acessToken=jwt.sign(
            {
                id:user._id,
                isAdmin:user.isAdmin
            },process.env.JWT_SEC,
            {
                expiresIn:"3d"
            }
        )

        const { password,...others}=user._doc;

        res.status(200).json({...others,acessToken});
} catch (error) {
    res.status(500).json(error)
}
})
module.exports=router;