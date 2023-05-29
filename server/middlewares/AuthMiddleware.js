// const verify=require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const validateToken=((req,res,next)=>{
    const accessToken=req.header("accessToken");
    const givenUsername=req.body.Username.trim();
    // console.log(req.body.Username);
    if(!accessToken){return res.json({error:"Please Login first!"});}
    try{
        const validToken=jwt.verify(accessToken,"UseraccessToken");
        if(validToken)
        {
            const validUsername=validToken.username.trim();
            
            console.log(validUsername);
            console.log(givenUsername);
            if(validUsername===givenUsername)
            {
                
                next();

            }
            else
            {
                throw "You are actions are not authorized";   
            }
        }
        else{throw "You are actions are not authorized";}
    }catch(err){
        console.log(err);
        res.json({error:err});
    }
});

module.exports=validateToken;