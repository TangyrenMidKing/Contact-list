
<?php

	$inData = getRequestInfo();

	// expected JSON
	// {
	//   "contactcardId" : "0"
	// }

	// response JSON
	// {
	//   "id": int,
	//   "firstName": "String",
	//   "lastName": "String",
	//	 "phonenumber": "String",
	//	 "email": "String",
	//   "error": "Error Message"
	// }

	$id = 0;
	$firstName = "";
	$lastName = "";
	$phoneNumber ="";
	$email = "";

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "Contacts");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT * FROM ContactCards WHERE ID=?");
		$stmt->bind_param("s", $inData["contactcardId"]);
		$stmt->execute();
		$result = $stmt->get_result();


		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['FirstName'], $row['LastName'], $row['PhoneNumber'], $row['Email'], $row['ID'] );

			//update lastLogin timestamp
			$lastLogin = $conn->prepare("UPDATE Users SET DateLastLoggedIn = now() WHERE Login=? AND Password=?");
			$lastLogin->bind_param("ss", $inData["login"], $inData["password"]);
			$lastLogin->execute();
			$lastLogin->close();
		}
		else
		{
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $phoneNumber, $email, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","phonenumber":"' . $phoneNumber . '","email":"' . $email . '", "error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
