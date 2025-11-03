import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors';
import { config } from 'dotenv';
config();

import authRoutes from './routes/authRoutes.js'
import infoRoutes from './routes/infoRoutes.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5000', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
}));

// มันจะเช็คว้าใน env มีตัวแปร PORT ไหมถ้ามีเอาค่านั้นมาใช้ || ถ้าไม่มี ค่า default = 5000
const PORT = process.env.PORT || 5000

app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, '../public')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/singIn.html'))
})
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/singUp.html'))
})
app.get('/infouser', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/infoUser.html'))
})

// Routes
app.use('/auth', authRoutes)
app.use('/information', infoRoutes)


app.listen(PORT, () => {
    console.log('Server has start on: ' + PORT)
})
