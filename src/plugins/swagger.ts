import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import fp from 'fastify-plugin'
import { withRefResolver } from 'fastify-zod'
import { getDocsConfig } from '../utils/docsConfig'

// const withRefResolver = (
//   options: FastifyDynamicSwaggerOptions,
// ): FastifyDynamicSwaggerOptions => ({
//   ...options,
//   refResolver: {
//     ...options.refResolver,
//     clone: true,
//     buildLocalReference: (json, _baseUri, _fragment, i) =>
//       typeof json.$id === `string` ? json.$id : `def-${i}`,
//   },
// })

export default fp<FastifyDynamicSwaggerOptions & { isDocPrivate: boolean }>(
    async (server, { isDocPrivate }) => {
      server.register(swagger, withRefResolver(getDocsConfig(isDocPrivate)))
    },
)