function  showSignIn()
{
  document.getElementById("sign_in").style.display='inline-block';
  document.getElementById("sign_up").style.display='none';
}

function showSignUp()
{
  document.getElementById("sign_up").style.display='inline-block';
  document.getElementById('sign_in').style.display='none';
}


var urlBase = 'http://cop4331.online/API';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("sign_in_name").value;
	var password = document.getElementById("sign_in_password").value;
  // var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;

				if( userId < 1 )
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "contact.html";

			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function doSignUp()
{
  userId = 0;
	firstName = "";
	lastName = "";

	var username = document.getElementById("sign_up_name").value;
	var password = document.getElementById("sign_up_password").value;
  var firstname = document.getElementById("sign_up_firstname").value;
  var lastname = document.getElementById("sign_up_lastname").value;

  if (username == 0)
  {
    document.getElementById("bland_alert").innerHTML = "Invaild user name";
  }
  else if (password == 0)
  {
    document.getElementById("bland_alert").innerHTML = "Invaild password";
  }
  else if (password.length < 8)
  {
    document.getElementById("bland_alert").innerHTML = "Password length must greater 8 characters";
  }
  else
  {
    // defalut name: spider man.
    if (firstname == 0)
    {
      firstname = "spider";
    }
    if (lastname == 0)
    {
      lastname = "man";
    }

  	var jsonPayload = '{"firstname" : "' + firstname + '", "lastname" : "' + lastname
                        + '", "login" : "' + username + '", "password" : "' + password + '"}';
  	var url = urlBase + '/Register.' + extension;

  	var xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);
  	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  	try
  	{
  		xhr.send(jsonPayload);
      document.getElementById("signupResult").innerHTML = "You are one of Us now!";
      setTimeout(() => {  showSignIn(); }, 2000);
  	}
  	catch(err)
  	{
  		document.getElementById("signupResult").innerHTML = err.message;
  	}
  }
}

function create()
{
  var firstname = document.getElementById("create_first_name").value;
  var lastname = document.getElementById("create_last_name").value;
  var phone_num = document.getElementById("create_phone_num").value;
  var email = document.getElementById("create_email").value;

  if (firstname == 0)
  {
    document.getElementById("createResult").innerHTML = "Invaild first name";
  }
  else if (lastname == 0)
  {
    document.getElementById("createResult").innerHTML = "Invaild last name";
  }
  else if (phone_num == 0)
  {
    document.getElementById("createResult").innerHTML = "Invaild phone number";
  }
  else if (email == 0 || !email.includes("@") || !email.includes("."))
  {
    document.getElementById("createResult").innerHTML = "Invaild email";
  }
  else
  {
    // expected JSON
    // {
    //    "userId" : "0",
    //    "firstname" : "firstname",
    //    "lastname" : "lastname",
    //    "phonenumber" : "phonenumber",
    //    "email" : "email@email.com"
    // }

    var jsonPayload = '{ "userId" : "' + userId +'", "firstname" : "' + firstname + '", "lastname" : "' + lastname
                        + '", "phonenumber" : "' + phone_num + '", "email" : "' + email + '"}';
    var url = urlBase + '/AddContact.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
      xhr.send(jsonPayload);
      document.getElementById("createResult").innerHTML = "New friend set up!";
    }
    catch(err)
    {
      document.getElementById("createResult").innerHTML = err.message;
    }
  }
}


function read()
{
  var search_val = document.getElementById("search_text").value;

  if (search_val == 0)
  {
    document.getElementById("searchAlert").innerHTML = "Invaild search value";
  }
  else
  {
    var jsonPayload = '{"userId" : "' + userId + '", "search" : "' + search_val + '"}';
    var url = urlBase + '/SearchContacts.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
      xhr.send(jsonPayload);
      var jsonObject = JSON.parse( xhr.responseText );
      var result = jsonObject.results;
      create_table(result);
    }
    catch(err)
    {
      document.getElementById("searchAlert").innerHTML = err.message;
    }
  }
}

function create_table(data)
{
  var table = document.getElementById('myTable')

  for (var i = 0; i < data.length; i++)
  {
    var row = `<tr>
    				<td>${data[i].id}</td>
    				<td>${data[i].firstName}</td>
    				<td>${data[i].lastName}</td>
            <td>${data[i].phoneNumber}</td>
            <td>${data[i].email}</td>
    			</tr>`
    table.innerHTML += row
  }
}
