const API_URL = '/check';

var data={
    user: null,
}

window.onload = function() {
    fetch(API_URL,{
        headers: {
            Authorization : 'Bearer '+ localStorage.token,
        }
    }).then(res =>res.json())
    .then((result) =>{
        // console.log(result);
        if(result.user){
            // console.log("user is present");
            data.user = result.user;
            console.log("you are : "+data.user.username);
            //we can run init for now we will just update the username
            document.getElementById("user").innerText = data.user.username;
        }
        else{
            logout();
        }
    })
}

window.logout=()=>{
    localStorage.removeItem('token');
    window.location = '/login';
}
