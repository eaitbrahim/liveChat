import { dynamo } from '@libs/dynamo';
import { DynamoDBStreamEvent } from 'aws-lambda';

export const handler = async (event: DynamoDBStreamEvent) => {
  try {
    
  } catch(error){
    console.log('Error', error);
    
  }
};