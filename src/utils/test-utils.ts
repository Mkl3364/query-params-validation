import { server } from ".."

export function build() {
    beforeAll(async () => {
      await server.ready()
    })
  
    afterAll(async () => {
      await server.close()
    })
  
    return server
}