// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');
const keyFilename = './credentials.json'

const cloudStorage = new Storage({keyFilename});
const bucketName = process.env.BUCKET_NAME;

async function upload(file, date, audioEncoding) {
  const stream    = require('stream'),
      dataStream  = new stream.PassThrough(),
      gcFile      = cloudStorage.bucket(bucketName).file(date+'.'+audioEncoding)

  dataStream.push(file)
  dataStream.push(null)

  await new Promise((resolve, reject) => {
    dataStream.pipe(gcFile.createWriteStream({
      resumable  : false,
      validation : false,
      metadata   : {'Cache-Control': 'public, max-age=31536000'}
    }))
    .on('error', (error) => { 
      reject(error) 
    })
    .on('finish', () => { 
      resolve(true)
    })
  })
  return gcFile.publicUrl()
}

module.exports = upload