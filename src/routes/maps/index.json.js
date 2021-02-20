import multer from 'multer'
import multers3 from 'multer-s3'
import * as aws from 'aws-sdk'
import path from 'path'

const s3 = new aws.S3({
  region: 'us-west-2',
  params: {
    bucket: 'ficture-bucket'
  }
})

const imageUpload = multer({
  storage: multers3({
    s3,
    bucket: 'ficture-bucket',
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(
        null,
        path.basename(
          file.originalname,
          `${path.extname(file.originalname)}-${Date.now()}${path.extname(
            file.originalname
          )}`
        )
      )
    }
  }),
  limits: {
    filesize: 2000000
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).single('file')

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)

  if (mimetype && extname) cb(null, true)
  else cb('Error: images only')
}

export function post(req, res) {
  imageUpload(req, res, (error) => {
    if (error) res.status(403).json({ error })
    else {
      if (!req.file) res.status(404).json({ messasge: 'Error: no file found' })
      else {
        const filename = req.file.key
        const location = req.file.location

        res.status(201).json({
          filename,
          location
        })
      }
    }
  })
}
