var userRegistered=[];
var loggedUser=[];
var flag=0;
function storeLoggedUser()
{
    sessionStorage.loggedUsers=JSON.stringify(loggedUser);
}

function getRegisteredUser()
{
    if(!localStorage.users)
        {
            localStorage.users=JSON.stringify([]);
        }
    else
        {
            userRegistered=JSON.parse(localStorage.users);
        }
}
function matchValues()
{
  var uname=document.getElementById("uname").value;
  var password=document.getElementById("password").value;
  for(i=0;i<userRegistered.length;i++)
      {
          flag=0;
          if(userRegistered[i].uname==uname && userRegistered[i].password==password)
              {
                  loggedUser.push(userRegistered[i]);
                   storeLoggedUser(loggedUser);
                  location.href="viewProducts.html";
                  flag=1;
                  break;
              }
      }
    if(flag==0)
        {
            alert("Invalid username or password");
        }
}
