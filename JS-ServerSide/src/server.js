const Hapi = require('@hapi/hapi')
const { contactRoute } = require('./routes/contact.routes')
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  server.route(contactRoute)

  await server.start()
  console.log(`server berjalan pada ${server.info.uri}`)
}

init()