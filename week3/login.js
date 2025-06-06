function LoginValidate()
{
      var enteremail=document.getElementById('email').value;
      var enterpassword=document.getElementById('pwd').value;
      
      var getemail=localStorage.getItem('email');
      var getpwd=localStorage.getItem('password');

      if(enteremail==getemail)
      {
            if(enterpassword==getpwd)
            {
                  alert("Login Success")
                  window.location="welcome.html"
                  return false
            }
            else{
                  alert("wrong Password")
            }
      }
      else{
            alert("Invalid Credentials")
      }
}