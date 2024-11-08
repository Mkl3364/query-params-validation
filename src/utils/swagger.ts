import { JsonSchema } from 'fastify-zod'

export type Property = {
  type: string
  properties: {
    [key: string]: object
  }
  example: object
}

export type MyJsonSchema = JsonSchema & {
  properties?: { [key: string]: Property }
}

export const bindExamples = (
  schemas: MyJsonSchema[],
  examples: { [id: string]: object },
) => {
  if (!schemas || schemas.length === 0) return

  const properties = schemas[0]?.properties

  for (const key in properties) {
    const property = properties[key] as Property
    const example = examples[`${key}Example`] as object

    property.example = example
  }
}
