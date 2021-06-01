<?php
	$inData = getRequestInfo();

// expected and response JSON
// if a field isn't being updated send in the empty string ""
// {
// 	  "id" : "0",
// 		"firstname" : "firstname",
// 		"lastname" : "lastname",
// 		"phonenumber" : "phonenumber",
// 		"email" : "email"
// }
	$id = $inData["id"];
	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
	$phonenumber = $inData["phonenumber"];
	$email = $inData["email"];


	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$check = $conn->prepare("SELECT ID, FirstName, LastName, PhoneNumber, Email FROM ContactCards WHERE ID=?");
		$check->bind_param("s", $inData["id"]);
		$check->execute();
		$result = $check->get_result();
		$check->close();

		if( !$row = $result->fetch_assoc()  ){
			returnWithError("No contact with this ID exists");
		}
		else{
			//if a value is an empty string "" keep the original database values
			if($id == ""){
				$id = $row-["ID"];
			}
			if($firstname == ""){
				$firstname = $row["FirstName"];
			}
			if($lastname == ""){
				$lastname = $row["LastName"];
			}
			if($phonenumber == ""){
				$phonenumber = $row["PhoneNumber"];
			}
			if($email == ""){
				$email = $row["Email"];
			}

			$stmt = $conn->prepare("UPDATE ContactCards SET FirstName=?, LastName=?, PhoneNumber=?, Email=? WHERE ID = ?");
			$stmt->bind_param("sssss", $firstname, $lastname, $phonenumber, $email, $id);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithInfo($firstname, $lastname, $id, $phonenumber, $email);
		}



	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstname, $lastname, $id, $phonenumber, $email )
	{
		$retValue = '{"id":"' . $id . '","firstname":"' . $firstname . '","lastname":"' . $lastname . '","phonenumber":"' . $phonenumber . '","email":"' . $email . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
