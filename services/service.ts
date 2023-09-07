import redis from "../connection/connection"

const fizzBuzz = async (n: number): Promise<Array<string>> => {
  n = n || 0

  if (isNaN(n) || n < 1 || !Number.isInteger(n)) {
    throw new Error('Invalid input. Please provide a positive integer.')
  }
  
  const cache: string | null = await redis.get(`fizzBuzz_${n}`)
  
  if (cache) {
    return JSON.parse(cache)
  }

  let res: Array<string> = []
  
  for (let i = 1; i <= n; i++) {
    let word: string = ''

    if (i % 3 === 0) {
      word += 'Fuzz'
    }

    if (i % 5 === 0) {
      word += 'Buzz'
    }

    if (word === '') {
      word = i.toString()
    }

    res.push(word)
  }

  await redis.set(`fizzBuzz_${n}`, JSON.stringify(res));

  return res
}

export default fizzBuzz