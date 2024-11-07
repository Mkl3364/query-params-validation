import { build } from "./utils/test-utils"

describe('endpoint test', () => {
    const app = build()
    test('endpoint', async () => {
      const res = await app.inject({
        url: '/hello',
        method: 'GET',
        query: { name: 'Pascal', age: '25' },
      })
      expect(res.statusCode).toEqual(200)
    })
})