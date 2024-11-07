import fastify from 'fastify';
import greetings from './greet.router';
import { registerSchemas } from './greet.schemas';

export const server = fastify({
    ajv: {
        customOptions: {
            strict: 'log',
            keywords: ['example']
        }
    }
})

export const start = async () => {
    
    server.listen({ port: 8080 }, (err, address) => {
        if (err) {
          console.log(err)
        //   process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    })

    greetings(server)

    registerSchemas(server)
}

start()