<?php
	$inData = getRequestInfo();

// expected JSON
// {
// 	  "id" : "0",
// }
	$id = $inData["id"];


	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "Contacts");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$check = $conn->prepare("SELECT ID FROM ContactCards WHERE ID=?");
		$check->bind_param("s", $inData["id"]);
		$check->execute();
		$result = $check->get_result();
		$check->close();

		if( !$row = $result->fetch_assoc()  ){
			returnWithError("No contact with this ID exists");
		}
		else{
			$stmt = $conn->prepare("DELETE from ContactCards WHERE ID = ?");
			$stmt->bind_param("s", $id);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError("");
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

?>
