const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const path = require('path')
const swaggerDocs = yaml.load(path.join(__dirname, 'swagger.yaml'))
const dbConnection = require('./server/database/connection')

dotEnv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', require('./server/routes/userRoutes'))
app.use('/api/v1/account', require('./server/routes/accountRoutes'))
app.use('/api/v1/transaction', require('./server/routes/transactionRoutes'))

// API Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/', (req, res, next) => {
  res.send('Hello from my Express server v2!')
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
