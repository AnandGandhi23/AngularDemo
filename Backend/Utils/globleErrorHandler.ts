import { AppError } from './appError'

// Cast Error
const handleCastErrorDB = (error: any) => {
	const message: string = `Invalid ${error?.path}: ${error?.value}.`
	return new AppError(message, 400)
}

// Duplicate Field Error
const handleDuplicateFieldsDB = (error: any) => {
	const message: string = `${Object.keys(
		error?.keyValue
	).join()} : ${Object.values(
		error?.keyValue
	).join()} is already taken. Use another value!`
	return new AppError(message, 400)
}

// Validation Error
const handleValidationErrorDB = (error: any) => {
	const errors: any = Object.values(error?.errors).map(
		(err: any) => err?.message
	)
	const message: string = `Invalid input data. ${errors?.join('. ')}`
	return new AppError(message, 400)
}

// Invalid Token
const handleJWTError = () => new AppError('Invalid token. Log in again!', 401)

// Token Expire Error
const handleJWTExpiredError = () =>
	new AppError('Your token has expired! Log in again.', 401)

// Send Error To front-End
const sendError = (error: any, req: any, res: any, next: any) => {
	if (req?.originalUrl?.startsWith('/api')) {
		// A) Operational, trusted error: send message to client
		if (error?.isOperational) {
			return res.status(error?.statusCode).json({
				message: error?.message,
			})
		}

		// B) Programming or other unknown error: don't leak error details
		return res.status(500).json({
			message: 'Something went very wrong! Try again later.',
		})
	}

	return res.status(error?.statusCode).json({
		title: 'Something went wrong!',
		message: 'Try again later.',
	})
}

const globleErrorHandler = (err: any, req: any, res: any, next: any) => {
	console.log('error', err)

	err.statusCode = err?.statusCode || 500

	let error = { ...err }
	error.message = err?.message

	if (error?.name === 'CastError') error = handleCastErrorDB(error)
	if (error?.code === 11000) error = handleDuplicateFieldsDB(error)
	if (err?.name === 'ValidationError') error = handleValidationErrorDB(error)
	if (error?.name === 'JsonWebTokenError') error = handleJWTError()
	if (error?.name === 'TokenExpiredError') error = handleJWTExpiredError()

	sendError(error, req, res, next)
}

export { globleErrorHandler }
