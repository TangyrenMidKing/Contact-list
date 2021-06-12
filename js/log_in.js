function cambiar_login()
{
  document.getElementById("signupResult").value = "";
  document.getElementById("loginResult").innerHTML = "";

  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
  document.querySelector('.cont_form_login').style.display = "block";
  document.querySelector('.cont_form_sign_up').style.opacity = "0";

  setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);

  setTimeout(function(){
  document.querySelector('.cont_form_sign_up').style.display = "none";
  },200);
}

function cambiar_sign_up(at)
{
  document.getElementById("signupResult").value = "";
  document.getElementById("loginResult").innerHTML = "";

  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
  document.querySelector('.cont_form_login').style.opacity = "0";

  setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
  },100);

  setTimeout(function(){  document.querySelector('.cont_form_login').style.display = "none";
  },400);
}

var urlBase = 'http://cop4331.online/API';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";
var contact_id = 0;

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("sign_in_name").value;
	var password = document.getElementById("sign_in_password").value;
  var hash = md5( password );

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
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
    document.getElementById("title").innerHTML = "Welcome back, " + firstName + " " + lastName;
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
    document.getElementById("signupResult").innerHTML = "Invaild user name";
  }
  else if (password == 0)
  {
    document.getElementById("signupResult").innerHTML = "Invaild password";
  }
  else if (password.length < 8)
  {
    document.getElementById("signupResult").innerHTML = "Password length at least 8 characters";
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
    var hash = md5( password );

  	var jsonPayload = '{"firstname" : "' + firstname + '", "lastname" : "' + lastname
                        + '", "login" : "' + username + '", "password" : "' + hash + '"}';
  	var url = urlBase + '/Register.' + extension;

  	var xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);
  	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  	try
  	{
  		xhr.send(jsonPayload);
      document.getElementById("signupResult").innerHTML = "You are one of Us now!";
      setTimeout(() => {  cambiar_login(); }, 2000);
  	}
  	catch(err)
  	{
  		document.getElementById("signupResult").innerHTML = err.message;
  	}
  }
}

function create()
{
  document.getElementById("createResult").innerHTML = "";

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
  resetCreate();
}

function resetCreate()
{
  document.getElementById("create_first_name").value = "";
  document.getElementById("create_last_name").value = "";
  document.getElementById("create_phone_num").value = "";
  document.getElementById("create_email").value = "";
  selectedRow = null;
}

function read()
{
  document.getElementById("createResult").innerHTML = "";
  var search_val = document.getElementById("search_text").value;

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
    document.getElementById("searchAlert").innerHTML = "No record found";
  }
}

function create_table(data)
{
  document.getElementById('myTable').innerHTML = "";
  var list = "";

  for (var i = 0; i < data.length; i++)
  {
    list += "<tr> <td>" + data[i].id + "</td>" +
            "<td>" + data[i].firstName + "</td>" +
            "<td>" + data[i].lastName + "</td>" +
            "<td>" + data[i].phoneNumber + "</td>" +
            "<td>" + data[i].email + "</td>" +
            "<td> <button type='button' onclick='show_update(" + data[i].id + ");'>Update</button>" +
            "<button type='button' onclick='onDelete("+ data[i].id +");'>Delete</button> </td>"
            + "</tr>";
  }
  document.getElementById('myTable').innerHTML = list;
}

function onDelete(id)
{
  document.getElementById("searchAlert").innerHTML = "";

  if (confirm("Are you sure you want to delete?") == false)
    return;

  var jsonPayload = '{"id" : "' + id + '"}';
  var url = urlBase + '/DeleteContact.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        document.getElementById("searchAlert").innerHTML = "Successfully Deleted";
      }
    };
    xhr.send(jsonPayload);
  }
  catch(err)
  {
    document.getElementById("deleteResult").innerHTML = err.message;
  }
}

function show_update(id)
{
  contact_id = 0;
  document.getElementById("update_div").style.display = "block";
  document.getElementById("create_div").style.display = "none";
  document.getElementById("update_first_name").value = "";
  document.getElementById("update_last_name").value = "";
  document.getElementById("update_phone_num").value = "";
  document.getElementById("update_email").value = "";
  document.getElementById("updateResult").innerHTML = "";

  contact_id = id;
}

function update()
{
  var firstname = document.getElementById("update_first_name").value;
  var lastname = document.getElementById("update_last_name").value;
  var phonenumber = document.getElementById("update_phone_num").value;
  var email = document.getElementById("update_email").value;

  var jsonPayload = '{"id" : "' + contact_id +'", "firstname" : "' + firstname + '", "lastname" : "' +     lastname + '", "phonenumber" : "' + phonenumber + '", "email" : "' + email + '"}';

  console.log(jsonPayload);
  var url = urlBase + '/UpdateContact.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        document.getElementById("updateResult").innerHTML = "Successfully updated";
      }
    };
    xhr.send(jsonPayload);
  }
  catch(err)
  {
    document.getElementById("updateResult").innerHTML = err.message;
  }

  document.getElementById("create_div").style.display = "block";
  document.getElementById("update_div").style.display = "none";
}
