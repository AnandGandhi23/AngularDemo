const cloudinary = require('cloudinary').v2
const multer = require('multer')

// Configuration
cloudinary.config({
	cloud_name: 'dwwcmiexl',
	api_key: '368683574724734',
	api_secret: 'M5Rn8pXXcZKc3RkGXv1BQVCKphQ',
})

const storage = multer.diskStorage({
	destination: function (
		req: any,
		file: any,
		cb: (arg0: null, arg1: string) => void
	) {
		cb(null, 'uploads') // store files in the 'uploads' folder
	},
	filename: function (
		req: any,
		file: { originalname: string },
		cb: (arg0: null, arg1: string) => void
	) {
		cb(null, Date.now() + '-' + file.originalname) // set the filename to be unique
	},
})

const upload = multer({ storage: storage }).single('profileImage')

export { cloudinary, storage, upload }
