// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
const upload = require('./GoogleStorageUploadController')

const projectId = '35939633025'
const keyFilename = './credentials.json'

const options = {
  projectId,
  keyFilename
}

// Creates a client
const client = new textToSpeech.TextToSpeechClient(options);

async function doTextToSpeech(text, languageCode, ssmlGender, name) {
  // Construct the request
  const request = {
    input: {text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode, ssmlGender, name},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  const url = await upload(response.audioContent);
  return url;
}

module.exports = doTextToSpeech;