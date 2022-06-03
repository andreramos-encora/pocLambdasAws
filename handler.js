'use strict';

const databaseManager = require('./dao');
var builder = require('xmlbuilder');

module.exports.buildSpeakSentence = async () => {
  const speakSentence = await databaseManager.findSpeakSentence();
  if (speakSentence) {
    const response = builder.create('Response')
      .ele("SpeakSentence", { 'voice': 'dave' }, speakSentence)
      .end({ pretty: true });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/xml' },
      body: response,
    };
  }
  else {
    return {
      statusCode: 204,
    };
  }
};

module.exports.updateSpeakSentence = async (event) => {
  console.log(event);
  const body = JSON.parse(event.body);
  const sentence = body.sentence;
  console.log('sentence to update:', sentence);

  if (sentence) {
    await databaseManager.updateSpeakSentence(sentence);

    return {
      statusCode: 200,
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing required parameter: sentence'
      }),
    };
  }
};
