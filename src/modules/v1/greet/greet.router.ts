import { FastifyInstance } from "fastify";
import { greet } from "./greet.controler";
import { getGreetingSchema } from "./greet.schemas";

const greetings = async (fastify: FastifyInstance): Promise<void> => {
    fastify.get(
        '/hello', 
        { schema : getGreetingSchema },
        greet
    );
}

export default greetings;