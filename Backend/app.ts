import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { studentRouter } from './student/studentRouter'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/student', studentRouter)

export { app }
