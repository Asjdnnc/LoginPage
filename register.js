// script.js
function togglePasswordVisibility() {
    var passwordField=document.getElementById("password");
    var eyeIcon=document.getElementById("eye");
    if (passwordField.type ==="password"){
        passwordField.type="text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else{
        passwordField.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}
    function register(){
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    //Sending a request to the server 
    fetch('http://localhost:3000/register',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'},
        body:JSON.stringify({username,password})
    })
    .then(response => response.json())
    .then(data =>{
        if (data.message==='User registered successfully') {
            document.getElementById("message").innerHTML="Registration successful!";
            setTimeout(()=>{
                window.location.href='/login';
            },1000);
        }else{
            document.getElementById("message").innerHTML="Registration failed. Try again.";}
    })
    .catch(error=> {
        console.error('Error:', error);
        document.getElementById("message").innerHTML="An error occurred. Please try again.";
    });
    // Prevent the form from submitting
    return false;
}
