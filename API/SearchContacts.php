<?php

	$inData = getRequestInfo();
	
	// expected JSON
	// {	
	// 	 "userId" : "0",
	//   "search" : "firstname"
	// }

	// response JSON
	//{
	//  "results": [
	//    {
	//      "id": 6,
	//      "firstName": "purple",
	//      "lastName": "bone",
	//      "phoneNumber": "4073324915",
	//      "email": "email@email.com"
	//    }
	//  ],
	//  "error": ""
	//}
	
	$searchResults = array();
	$searchCount = 0;
	
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "Contacts");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{	
		
		$stmt = $conn->prepare("SELECT * FROM ContactCards WHERE UserID=? and FirstName like ?");
		$firstName = "%" . $inData["search"] . "%";
		$stmt->bind_param("ss", $inData["userId"], $firstName);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			$searchResults[] = array(
							"id" => $row["ID"],
							"firstName" => $row["FirstName"],
							"lastName" => $row["LastName"],
							"phoneNumber" => $row["PhoneNumber"],
							"email" => $row["Email"]
							);
			$searchCount++;
		}
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
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
	
	function returnWithInfo( $searchResults )
	{	
		$retValue = '{"results":' . json_encode($searchResults) . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>