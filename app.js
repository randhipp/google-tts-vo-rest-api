require('dotenv').config()

const fastify = require('fastify')({
  logger: true
})

const { doTextToSpeech, getVoiceList } = require('./controller/VoiceoverController');

fastify.post('/tts', async (req, reply) => {
  const ssmlGender = req.body.gender === 'female' ? 'female' : 'male'
  const language = req.body.language || 'id-ID'
  const name = ssmlGender === 'female' ? `${language}-Wavenet-A` : `${language}-Wavenet-B`
  const audioEncoding = req.body.format || 'mp3'
  
  const url = await doTextToSpeech(req.body.text, language, ssmlGender, name, audioEncoding)
  reply.send({ url })
})

fastify.get('/voices', async (req, reply) => {
  const voices = await getVoiceList()
  reply.send({ voices })
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()