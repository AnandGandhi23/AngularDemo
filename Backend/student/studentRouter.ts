import express from 'express'
import {
	deleteStudent,
	getAllStudent,
	getStudentById,
	studentCreate,
} from './studentController'
import { upload } from '../Utils/upload'
import { studentMiddleware } from './studentMiddleware'

const studentRouter = express.Router()

studentRouter
	.route('/createstudent')
	.post(upload, studentMiddleware, studentCreate)

studentRouter.route('/getallstudents').get(getAllStudent)

studentRouter.route('/getstudentbyid/:id').get(getStudentById)

studentRouter.route('/deleteStudent/:id').delete(deleteStudent)

export { studentRouter }
