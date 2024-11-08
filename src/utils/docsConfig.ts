import { FastifyDynamicSwaggerOptions, JSONObject } from '@fastify/swagger'

const publicTags = [
    {
      name: 'Server Health',
      description:
        'This section contains an endpoint for checking if the server is online.',
    },
    {
      name: 'Reports',
      description: 'This section contains endpoints for managing reports.',
    },
    {
      name: 'Catalog',
      description: 'This section contains endpoints for managing the catalog.',
    },
    {
      name: 'Orders',
      description: 'This section contains endpoints for managing orders.',
    },
    {
      name: 'Locations',
      description: 'This section contains endpoints for managing locations.',
    },
  ]

  const privateTags = [
    {
      name: 'Tills',
      description: 'This section contains endpoints for managing tills.',
    },
    {
      name: 'Keys',
      description: 'This section contains endpoints for managing keys.',
    },
    {
      name: 'Consumers',
      description: 'This section contains endpoints for managing consumers.',
    },
    {
      name: 'Jobs',
      description: 'This section contains endpoints for managing jobs.',
    },
    {
      name: 'Orders-live',
      description:
        'This section contains endpoints for managing orders-live. Detailed descriptions and formulas for the attributes can be found in the [Order API documentation](../../docs/order-live).',
    },
  ]

export const getDocsConfig = (
    isPrivate = false,
  ): FastifyDynamicSwaggerOptions => ({
    stripBasePath: true,
    hideUntagged: true,
    openapi: {
      info: {
        title: 'Pragma API',
        description:
          'Pragma provides a REST API exposing a set resources from our compatible POS solutions. This API is designed to be used by third-party applications from partners.',
        version: '1',
        contact: {
          name: 'Pragma Project',
          email: 'florion@popina.com',
          url: 'https://www.pragma-project.dev',
        },
      },
      servers: [
        {
          url: 'http://localhost:4000',
        },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'authorization',
            in: 'header',
            description:
              "To get an API key, please contact us. We'll be happy to help you.",
          },
        },
      },
      externalDocs: {
        url: 'https://www.pragma-project.dev/docs/getting-started',
        description: 'Pragma API specifications',
      },
      tags: isPrivate ? [...publicTags, ...privateTags] : publicTags,
    },
    transform: ({ schema, url }) => {
      const transformedSchema = { ...schema }
  
      if (isPrivate) {
        transformedSchema.hide = false
      }
  
      return {
        schema: transformedSchema as unknown as JSONObject,
        url,
      }
    },
  })
  