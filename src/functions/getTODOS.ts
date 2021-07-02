import { APIGatewayProxyHandler } from 'aws-lambda';
import {document} from 'src/util/dynamodbClient';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;
 
  const response = await document.query({
    TableName: "todo",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();

  if(!response){
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "This user do not exists",
      }),
      headers: {
        "Content-type" : "application/json",
      }
    }
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "TODO List!",
      content:  response,
    }),
    headers: {
      "Content-type": "application/json",
    },
  };

}