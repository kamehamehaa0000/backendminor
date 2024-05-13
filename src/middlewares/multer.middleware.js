import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destinationPath = join(__dirname, '..', '..', 'public', 'temp') // Adjusting the path to go up two directories to the project root
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
