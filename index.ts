require('dotenv').config({ path: 'config.env' })

import app from './routes/routes'


const PORT = process.env.SERVER_PORT || 3001

  app.listen(PORT, () => {
		console.log(`app on port ${PORT}`)
})
