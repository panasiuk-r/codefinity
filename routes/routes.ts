import express, { Request, Response } from 'express'

import fizzBuzz from '../services/service'

const app = express()
app.use(express.json())
  

app.get('/run', async (request: Request, response: Response) => {
  try {
    const num: number = Number(request.query.num)
    const result: Array<string> = await fizzBuzz(num)

    response.json({ fizzBuzz: result })
  } catch (error: any) {
    response.status(400).json({ error: { message: error.message } })
  }
})
  
export default app