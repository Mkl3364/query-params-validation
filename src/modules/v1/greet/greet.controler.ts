import { RouteHandler } from "fastify";
import { QueryStringSchema } from "./greet.schemas";

export const greet: RouteHandler<{
    Querystring: QueryStringSchema
}> = async (request, reply) => {
    const { name, age } = request.query;
    console.log('typeof name:', typeof name);
    console.log('typeof age:', typeof age);
    if(typeof age !== 'number') {
        reply.code(500).send({ message: 'Age must be a number' });
        throw new Error('Age must be a number');
    }
    reply.code(200).send({ message: `Hello ${name}!`, age: age || "unknown" });
}