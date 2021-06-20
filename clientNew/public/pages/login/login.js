// import Joi from 'joi';
const Joi = require('joi');

const LOGIN_URL = '/auth/login';

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
});

function loadingHandler(){
    if(data.logingIn){
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
    login();
}

var data={
    logingIn: false,
    errorMessage: '',
    user: {
        username: '',
        password: '',
    }
}

function login(){
    // console.log("hello")
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
            data.logingIn =true;
            loadingHandler();               
            fetch(LOGIN_URL, {
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
                // console.log(user);
                localStorage.token = user.token;
                setTimeout(()=>{ 
                    data.logingIn = false;
                    // loadingHandler();              
                    window.location = '/Dashboard'}
                    ,500);
            })).catch((error) =>{
                // console.log(error);
                // console.log(error.message);
                setTimeout(()=>{ 
                    data.logingIn = false;
                    loadingHandler();            
                    data.errorMessage = error.message;
                    errorHandler();
                }
                    ,500);
            })
        }
        }
    
function validUser() {
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


