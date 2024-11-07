import { FastifyInstance, FastifySchema } from "fastify";
import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const queryStringSchema = z.object({
    name: z.string().min(1, "Name must be at least 1 character long"),
    age: z.number()
})

export const { schemas: greetSchemas, $ref: consumerRef } = buildJsonSchemas(
    {
      queryStringSchema,
    },
    { $id: 'greetSchemas', target: 'jsonSchema7' },
)

export const getGreetingSchema: FastifySchema = {
    querystring: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            age: { type: 'number' }
        },
        required: ['name'],
        additionalProperties: false
    }
}

export type QueryStringSchema = z.infer<typeof queryStringSchema>;

export const registerSchemas = async(fastify: FastifyInstance): Promise<void> => {
    for (const schema of [...greetSchemas]) {
        fastify.addSchema(schema)
    }
}