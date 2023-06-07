import catchAsync from '../Utils/catchAsync'
import { cloudinary } from '../Utils/upload'
import { StudentModel } from './studentModel'

const studentCreate = catchAsync(async (req: any, res: any): Promise<any> => {
	cloudinary.uploader.upload(
		req.file.path,
		{
			folder: 'images',
		},
		async function (error: any, result: any) {
			if (error) {
				console.log('Error uploading file:', error)
				return res.status(201).json({
					message: 'Something wrong in file Upload',
				})
			} else {
				console.log(result)
				Object.assign(req.body, { photo: result.url })

				const data = new StudentModel({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					phone: req.body.phone,
					profileImage: result.url,
				})

				const user = await data.save()

				return res.status(201).json({
					status: 'success',
					message: 'User created successfully.',
					user,
				})
			}
		}
	)

	// const data = new StudentModel({
	// 	firstName: req.body.firstName,
	// 	lastName: req.body.lastName,
	// 	email: req.body.email,
	// 	phone: req.body.phone,
	// 	profileImage: req?.file?.path,
	// })

	// const user = await data.save()

	// return res.status(201).json({
	// 	status: 'success',
	// 	message: 'User created successfully.',
	// 	user,
	// })
})

// const studentUpdate = catchAsync(async (req: any, res: any): Promise<any> => {
// 	const data = new StudentModel({
// 		firstName: req.body.firstName,
// 		lastName: req.body.lastName,
// 		email: req.body.email,
// 		phone: req.body.phone,
// 		profileImage: req?.file?.path,
// 	})

// 	const user = await data.save()

// 	return res.status(201).json({
// 		message: 'User created successfully.',
// 		user,
// 	})
// })

const getAllStudent = catchAsync(async (req: any, res: any) => {
	const students = await StudentModel.find()

	return res.status(200).json({
		students,
	})
})

const getStudentById = catchAsync(async (req: any, res: any) => {
	const id = req.params.id
	console.log(id)

	const student = await StudentModel.findById(id)

	if (!student) {
		return res.status(404).json({
			status: 'fail',
			message: 'Student not Found',
		})
	}

	return res.status(200).json({
		status: 'success',
		student,
	})
})

const deleteStudent = catchAsync(async (req: any, res: any) => {
	const id = req.params.id

	const student = await StudentModel.findById(id)

	if (!student) {
		return res.status(404).json({
			status: 'fail',
			message: 'Student not found',
		})
	}

	await StudentModel.findByIdAndDelete(id)

	return res.status(200).json({
		status: 'success',
		message: 'Student Deleted Successfully',
	})
})

export { studentCreate, getAllStudent, getStudentById, deleteStudent }
