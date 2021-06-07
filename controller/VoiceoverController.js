// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
const upload = require('./GoogleStorageUploadController')

const fs = require('fs');
const util = require('util');

const keyFilename = './credentials.json'

// Creates a client
const client = new textToSpeech.TextToSpeechClient({keyFilename});

async function getVoiceList() {
  return 'TODO';
}

async function doTextToSpeech(text, languageCode, ssmlGender, name, audioEncoding) {
  // Construct the request
  const request = {
    input: {text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode, ssmlGender, name},
    // select the type of audio encoding
    audioConfig: {audioEncoding: audioEncoding.toLowerCase().includes('wav') ? 'LINEAR16' : 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  const date = + new Date();

  const url = await upload(response.audioContent, date, audioEncoding);

  if (process.env.DEBUG === 'TRUE') {
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(__dirname + '/../results/'+ date +'.'+audioEncoding, response.audioContent, 'binary');
    console.log('Audio content written to file');
  }

  return url;
}

module.exports = {
  doTextToSpeech,
  getVoiceList
};