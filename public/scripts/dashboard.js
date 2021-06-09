(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const API_URL = 'http://localhost/check'

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnROZXcvcHVibGljL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgQVBJX1VSTCA9ICdodHRwOi8vbG9jYWxob3N0L2NoZWNrJ1xyXG5cclxudmFyIGRhdGE9e1xyXG4gICAgdXNlcjogbnVsbCxcclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZmV0Y2goQVBJX1VSTCx7XHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBBdXRob3JpemF0aW9uIDogJ0JlYXJlciAnKyBsb2NhbFN0b3JhZ2UudG9rZW4sXHJcbiAgICAgICAgfVxyXG4gICAgfSkudGhlbihyZXMgPT5yZXMuanNvbigpKVxyXG4gICAgLnRoZW4oKHJlc3VsdCkgPT57XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICBpZihyZXN1bHQudXNlcil7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidXNlciBpcyBwcmVzZW50XCIpO1xyXG4gICAgICAgICAgICBkYXRhLnVzZXIgPSByZXN1bHQudXNlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIDogXCIrZGF0YS51c2VyLnVzZXJuYW1lKTtcclxuICAgICAgICAgICAgLy93ZSBjYW4gcnVuIGluaXQgZm9yIG5vdyB3ZSB3aWxsIGp1c3QgdXBkYXRlIHRoZSB1c2VybmFtZVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJcIikuaW5uZXJUZXh0ID0gZGF0YS51c2VyLnVzZXJuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsb2dvdXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG53aW5kb3cubG9nb3V0PSgpPT57XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcclxuICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4nO1xyXG59XHJcbiJdfQ==
