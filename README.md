# WAFVEL VOICEOVER
___

<a href="https://www.buymeacoffee.com/randhipp"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=randhipp&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"></a>

REST API to creating TTS / text to speech / synthesis speech / Voice Over

This NodeJS App will convert your text to audio/mp3 and upload it to google cloud storage. ( you must create new public bucket )

Created using ***Google Text To Speech API*** and ***Fastify***

#### How To Run
- Clone this repo, set you `.env`
- yarn / npm
- copy your google credentials to root folder beside package.json
  `./credentials.json`
- yarn start / npm start
- if you set `DEBUG=ON` in .env

#### API Docs

POST : http://localhost:3000/tts

Request
```json
{
    "text":"hello, how are you?",
    "gender":"female",
    "language":"id-ID", // https://cloud.google.com/text-to-speech/docs/voices
    "format":"MP3" // or WAV
}
```
Response
```json
{
  "url": "https://storage.googleapis.com/<bucket-name>/1623081231612.mp3"
}
```


#### Audio Sample

[mp3](/sample/sample.mp3)
