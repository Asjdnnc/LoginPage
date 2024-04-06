function togglePasswordVisibility() {
    var passwordField= document.getElementById("password");
    var   eyeIcon=document.getElementById("eye");
    if (passwordField.type === "password") {
        passwordField.type ="text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else{
         passwordField.type= "password";
          eyeIcon.classList.remove("fa-eye-slash");
         eyeIcon.classList.add("fa-eye");
    }
};
function login(){
    var username=document.getElementById("username").value;
    var   password=document.getElementById("password").value;
    // Sending a request to the server to check the details
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
 })
    .then(response=>response.json())
    .then(data =>{
        if (data.message=== 'Login successful') {
            document.getElementById("message").innerHTML="Login successfull!";
            window.location.href='/login/welcome'; }
                else{
           p=document.getElementById("message");
           p.innerHTML = "*Invalid username or password.";
            p.style.color="red";}
    })
    .catch(err=>{
        console.error('Error:',err);
        document.getElementById ("message").innerHTML="An error occurred. Please try again.";
    });
    //Prevent the form from submitting
    return false;
}

