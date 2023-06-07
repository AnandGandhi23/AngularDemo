import { app } from './app'
import dotenv from 'dotenv'
dotenv.config({ path: 'config.env' })
import mongoose from 'mongoose'

const DB = 'mongodb://localhost:27017/student'

mongoose.set('strictQuery', true)
mongoose
	.connect(DB)
	.then(() => {
		console.log('MongoDB Connected')
	})
	.catch((error) => console.log(error))

app.listen(4900, () => {
	console.log('Server started on port 4900')
})
