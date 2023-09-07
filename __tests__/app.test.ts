import request, { Response } from 'supertest'

import app from '../routes/routes'
import redis from '../connection/connection'

jest.mock('../connection/connection')
const mockedRedis = jest.mocked(redis)

describe('GET /run', () => {
  it('should return a valid FizzBuzz sequence if it stored in Redis', async () => {
    const num: number = 15
    let arr = ['1', '2', 'Fuzz', '4', 'Buzz', 'Fuzz', '7', '8', 'Fuzz', 'Buzz', '11', 'Fuzz', '13', '14', 'FuzzBuzz']
    
    mockedRedis.get.mockResolvedValue(JSON.stringify(arr))

    const response: Response = await request(app).get(`/run?num=${num}`)
    
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      fizzBuzz: arr
    })
  })

  it('should return a 400 bed Request when num parameter is missing', async () => {
    const response: Response = await request(app).get('/run')

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: { message: 'Invalid input. Please provide a positive integer.' } })
  })

  it('should return a valid FizzBuzz sequence if it is not stored in Redis', async () => {
    const num: number = 15
    let arr = ['1', '2', 'Fuzz', '4', 'Buzz', 'Fuzz', '7', '8', 'Fuzz', 'Buzz', '11', 'Fuzz', '13', '14', 'FuzzBuzz']

    mockedRedis.get.mockResolvedValue(null)
    mockedRedis.set.mockResolvedValue('OK')

    const response: Response = await request(app).get(`/run?num=${num}`)
    
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      fizzBuzz: arr
    })
  })

  it('should return a 400 bed Request for invalid request', async () => {
    const response: Response = await request(app).get('/run?=10.23')

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: { message: 'Invalid input. Please provide a positive integer.' } })
  })
})