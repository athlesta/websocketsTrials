// import Joi from 'joi';
const Joi = require('joi');

// // import loading_anim from '../assets/loading.svg';

const SIGNUP_URL = '/auth/signup';


function loadingHandler(){
    if(data.signingUp){
        document.getElementById("loading").style.display = "block";    
        document.getElementById("formElements").style.display = "none";
    }
    else{
        document.getElementById("loading").style.display = "none";
        document.getElementById("formElements").style.display = "block";
    }
}

function errorHandler(){
    document.getElementById("errorMessage").innerText = data.errorMessage;
    if(data.errorMessage){
        document.getElementById("errorMessage").style.display = "block";
    }
    else{
        document.getElementById("errorMessage").style.display = "none";
    }
}

window.submitForm= (event)=>{
    event.preventDefault();
    // console.log("hello there");
    const formData = Object.fromEntries(new FormData(event.target).entries());
    data.user.username = formData.username;
    data.user.password = formData.password;
    data.user.confirmPassword = formData.confirmPassword;
    signup();
}
const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9_]{8,30}$'))
        .min(8)
        .trim()
        .required(),
    
    confirmPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9_]{8,30}$'))
        .min(8)
        .trim()
        .required(),
});


var data={
    signingUp: false,
    errorMessage: '',
    user: {
        username: '',
        password: '',
        confirmPassword: '',
    }
}

function signup(){
        data.errorMessage = '';
        errorHandler();
        // console.log(this.user);
        if(validUser()){
            //send data to server
            //console.log("got true");
            const body = {
                username : data.user.username,
                password : data.user.password,
            }
            data.signingUp =true;
            loadingHandler();
            fetch(SIGNUP_URL, {
                method: 'POST',
                body: JSON.stringify(body),
                headers : {
                    'content-type' : 'application/json'
                }
            }).then((response) =>{
                if(response.ok){
                    return response.json();
                }
                return response.json().then((error)=> {
                    throw new Error(error.message)
                })
            }).then((user =>{
                console.log(user);
                localStorage.token = user.token;
                console.log("taken stored");
                setTimeout(()=>{ 
                    data.signingUp = false;
                    // loadingHandler();
                    window.location = '/Dashboard'
                }
                    ,500);
            })).catch((error) =>{
                //console.log(error);
                setTimeout(()=>{ 
                    data.signingUp = false;
                    loadingHandler();
                    data.errorMessage = error.message;
                    errorHandler();
                    }
                    ,500);
            })
        }
        }
    
function validUser() {
    if(data.user.password !== data.user.confirmPassword){
        data.errorMessage = 'Passwords must Match';
        errorHandler();
        // console.log('Passwords must Match.');
        return false;
    }

    const result = schema.validate(data.user);
    if(result.error === undefined){
        return true;
    }
    else{
        // console.log(result.error);
        if(result.error.message.includes('username'))
        {
            data.errorMessage = 'Username is Invalid';
            // console.log("Username is Invalid");
        }
        else
        {
            data.errorMessage = 'Password is Invalid';
            // console.log("Password is Invalid");
        }
        errorHandler();
        return false
    }
}


