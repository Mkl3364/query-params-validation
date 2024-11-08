import autoload from '@fastify/autoload';
import fastify from 'fastify';
import { join } from 'path';
import greetings from './modules/v1/greet/greet.router';
import { registerSchemas } from './modules/v1/greet/greet.schemas';

export const server = fastify({
    ajv: {
        customOptions: {
            strict: 'log',
            keywords: ['example']
        }
    }
})

server.register(autoload, {
    dir: join(__dirname, 'plugins'),
})

  // Register all modules in the `src/modules` directory.
  server.register(autoload, {
    dir: join(__dirname, 'modules'),
    // Entry point of each module is named `*.router.ts`.
    indexPattern: /.*\.router\.[jt]s/,
    // Match all files ending with `*.router.ts`.
    // https://regex101.com/r/OXuR9c/1
    matchFilter: /^.*\.router\.[jt]s$/,
  })

export const start = async () => {
    
    server.listen({ port: 8080 }, (err, address) => {
        if (err) {
          console.log(err)
          process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    })

    greetings(server)

    registerSchemas(server)
}

start()