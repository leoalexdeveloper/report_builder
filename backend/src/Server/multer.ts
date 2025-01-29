import multer from 'multer'
import {encrypt} from '../Helpers/encrypt'

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, './Public/tmp_user_uploads')
  },
  filename: function(req, file, cb) {
    const date = Date.now()
    const uniqueSuffix = date + '-' + encrypt(String(date))
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

multer({storage: storage})

export const multerInstance = multer()
