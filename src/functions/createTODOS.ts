import { APIGatewayProxyHandler } from 'aws-lambda';
import {document} from 'src/util/dynamodbClient';
import {v4 as uuidV4} from 'uuid';

interface ICreateTODO {
  title: string;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async (event) =>  {
  const { id } = event.pathParameters;
  const {title, deadline} = JSON.parse(event.body) as ICreateTODO;

  const response = await document.put({
    TableName: "todo",
    Item: {
      id: uuidV4(),
      user_id: id,
      title,
      done: false,
      deadline: new Date(deadline)
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "TODO created!",
      content: response,
    }),
    headers: {
      "Content-type": "application/json",
    }
  }

};