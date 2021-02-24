import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { Map } from '../../models/Map'

const s3 = new S3Client({
  region: 'us-west-2'
})

export async function post(req, res) {
  try {
    const { file } = req
    const { username, name } = req.body
    const fileTypes = /jpeg|jpg/

    if (!file || !username || !name)
      throw new Error('missing required attributes')

    if (!fileTypes.test(path.extname(file.originalname).toLowerCase()))
      throw new Error('file must be a jpeg image')

    const key = `${path.basename(
      file.originalname,
      path.extname(file.originalname)
    )}-${Date.now()}${path.extname(file.originalname)}`
    const link = `https://ficture-bucket.s3-us-west-2.amazonaws.com/${key}`

    const params = {
      Body: file.buffer,
      Bucket: 'ficture-bucket',
      Key: key,
      ACL: 'public-read'
    }

    const command = new PutObjectCommand(params)

    await s3.send(command)

    const map = new Map({
      mapId: uuidv4(),
      user: username,
      location: link,
      name
    })

    await map.save()

    res.sendStatus(201)
  } catch (err) {
    res.status(403).json(err)
  }
}

export async function get(req, res) {
  try {
    const { username } = req.query

    if (!username) throw new Error('missing required username query param')

    const maps = await Map.find({ user: username })

    res.status(200).json(
      maps.map((map) => {
        const { mapId, user, location, name } = map

        return { mapId, user, location, name }
      })
    )
  } catch (err) {
    res.status(403).json(err)
  }
}
