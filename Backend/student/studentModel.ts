import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
	firstName: string
	lastName: string
	email: string
	phone: number
	profileImage: string
	createdAt?: Date
}

const studentSchema: Schema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: Number, required: true, unique: true },
		profileImage: { type: String, required: true },
	},
	{ timestamps: true }
)

const StudentModel = mongoose.model<IUser>('User', studentSchema)

export { StudentModel }
