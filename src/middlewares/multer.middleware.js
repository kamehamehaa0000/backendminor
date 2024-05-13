import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destinationPath = path.join(__dirname, 'public', 'temp') // Constructing the destination path using path module
    callback(null, destinationPath)
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  },
})

const upload = multer({
  storage: storage,
})

export default upload
