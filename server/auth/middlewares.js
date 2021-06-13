const jwt = require('jsonwebtoken');
function checkTokenSetUser(req,res,next) {
    //catch the authotisation header
    const authHeader = req.get('Authorization')
    if(authHeader){
        // console.log(authHeader);
        const token = authHeader.split(' ')[1];
        if(token){
            //decode the token
            jwt.verify(token, process.env.TOKEN_SECRET, (error, user)=> {
                if(error){
                    // console.log(error); // bar
                }
                // console.log("Copied "+user+" to req.user");
                req.user = user;
                next();
            });
        }else{
            next();
        }
        //console.log(token);
    }
    else{
        next();
    }
    
}

function verifyJwtToken(req,res,next) {
    //catch the authotisation header
    const authHeader = req.get('Authorization')
    if(authHeader){
        // console.log(authHeader);
        const token = authHeader.split(' ')[1];
        if(token){
            //decode the token
            jwt.verify(token, process.env.TOKEN_SECRET, (error, user)=> {
                if(error){
                    res.status(500).json(error);
                }
                next();
            });
        }else{
            console.log("error ", "Token is not Present")
            res.status(500).json("error");
        }
        //console.log(token);
    }
    else{
        console.log("error ", "AuthHeader is not Present")
        res.status(500).json("error");
    }
    
}
module.exports={
    checkTokenSetUser,
    verifyJwtToken
}