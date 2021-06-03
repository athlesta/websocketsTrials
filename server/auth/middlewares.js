const jwt = require('jsonwebtoken');
function checkTokenSetUser(req,res,next) {
    //catch the authotisation header
    const authHeader = req.get('authorization')
    if(authHeader){
        //console.log(authHeader);
        const token = authHeader.split(' ')[1];
        if(token){
            //decode the token
            jwt.verify(token, process.env.TOKEN_SECRET, (error, user)=> {
                if(error){
                    console.log(error); // bar
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

module.exports={
    checkTokenSetUser,
}