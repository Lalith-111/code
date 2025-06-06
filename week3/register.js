function validate()
{
      var form = document.forms["frm"];
      var fn=frm.fname.value;
      localStorage.setItem("firstname",fn);
      for(x in fn)
      {
            ch=fn.charCodeAt(x);
            if(ch<65||ch>90&&ch<97||ch>122)
            {
                  alert("Invalid FirstName");
                  return false;
            }
      }
      
      var ln=frm.lname.value;
      localStorage.setItem("lastname",ln);
      for(y in ln)
      {
            ch=ln.charCodeAt(y);
            if(ch<65||ch>90&&ch<97||ch>122)
            {
                  alert("Invalid LastName");
                  return false;
            }
      }

      var phn=frm.phone.value;
      localStorage.setItem("phone",phn);
      var lenp=phn.length;
      if(lenp!==10)
      {
            alert("Phone Number Should be Exactly 10 Digits");
            return false;
      }

      var pwd1=frm.pwd.value;
      localStorage.setItem("password",pwd1);
      var pwdl=pwd1.length;
      if(pwdl%2===1)
      {
            alert("Passsword must contain even number of characters");
            return false;
      }
      if(pwdl>8)
      {
            alert("Password should not exceed 8 characters");
            return false;
      }
      var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      var mail = frm.emailid.value;
      localStorage.setItem("email",mail)
      if (regex.test(mail))
      {
            alert("Valid Email address");
      } 
      else 
      {
            alert("Invalid Email address");
            return false;
      }
      return true;
}