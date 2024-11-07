import { RouteHandler } from "fastify";
import { QueryStringSchema } from "./greet.schemas";

export const greet: RouteHandler<{
    Querystring: QueryStringSchema
}> = async (request, reply) => {
    const { name, age } = request.query;
    console.log('typeof name:', typeof name);
    console.log('typeof age:', typeof age);
    reply.code(200).send({ message: `Hello ${name}!`, age: age || "unknown" });
}