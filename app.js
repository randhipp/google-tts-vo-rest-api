const fastify = require('fastify')({
  logger: true
})

const doTextToSpeech = require('./controller/VoiceoverController');

fastify.post('/', async (req, reply) => {
  const ssmlGender = req.body.gender.toLowerCase() || 'female'
  const language = req.body.language || 'id-ID'
  const name = ssmlGender.includes('female') ? `${language}-Wavenet-A` : `${language}-Wavenet-B`
  const url = await doTextToSpeech(req.body.text, language, ssmlGender, name)
  reply.send({ url })
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