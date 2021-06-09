const router = require('express').Router();
const verify_token = require('../verify_token/verify_jwt_token');

router.get('/posts',user_auth.verifyJwtToken,async (req,res)=>{
    
});

module.exports = router;