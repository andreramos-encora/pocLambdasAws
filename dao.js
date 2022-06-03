
'use strict';
const AWS = require('aws-sdk');

module.exports.updateSpeakSentence = async (sentence) => {
  if (sentence) {
    console.log('updating speak sentence to: ', sentence);
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const putParams = {
      TableName: process.env.DYNAMODB_SPEAKSENTENCE_TABLE,
      Item: {
        'primary_key': 'speakSentence',
        'sentence': sentence,
      },
    };

    await dynamoDb.put(putParams).promise();
  } else {
    throw new Error('Invalid sentence to update');
  }

};

module.exports.findSpeakSentence = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.DYNAMODB_SPEAKSENTENCE_TABLE,
    Key: {
      'primary_key': 'speakSentence'
    },
  };
  console.log('finding sentence in the database...');
  try {
    const data = await dynamoDb.get(params).promise();
    console.log('found sentence: ', data);
    return data.Item.sentence;
  } catch (err) {
    console.log('error fetching: ', err);
  }

};