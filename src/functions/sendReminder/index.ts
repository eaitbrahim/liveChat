import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { SendEmailCommand, SendEmailCommandInput, SESClient } from '@aws-sdk/client-ses';
import { PublishCommand, PublishCommandInput, SNSClient } from '@aws-sdk/client-sns';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { DynamoDBStreamEvent } from 'aws-lambda';

const sesClient = new SESClient({});
const snsClient = new SNSClient({});

export const handler = async (event: DynamoDBStreamEvent) => {
  try {
    const reminderPromises = event.Records.map(async record => {
      const data = unmarshall(record.dynamodb.OldImage as Record<string, AttributeValue>);
      const { email, phoneNumber, reminder } = data;
      if(phoneNumber){
        await sendSMS({phoneNumber, reminder});
      }
      if(email){
        await sendEmail({email, reminder});
      }
    });

    await Promise.all(reminderPromises)
  } catch(error){
    console.log('Error', error);
  }
};

const sendEmail = async ( {email, reminder }: {email: string, reminder: string}) => {
  const params: SendEmailCommandInput = {
    Source: 'eaitbrahim@gmail.com',
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: reminder
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Your reminder!'
      }
    }
  };

  const command = new SendEmailCommand(params);
  const res = await sesClient.send(command);
  return res.MessageId;
};

const sendSMS = async ({ phoneNumber, reminder}: {phoneNumber: string, reminder: string}) => {
  const params: PublishCommandInput = {
    Message: reminder,
    PhoneNumber: phoneNumber
  };
  const command = new PublishCommand(params);
  const res = await snsClient.send(command);
  return res.MessageId;

};