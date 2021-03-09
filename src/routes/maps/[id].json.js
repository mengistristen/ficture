import { Map } from '../../models/Map'

export async function get(req, res) {
  try {
    const { id } = req.params

    const { mapId, user, location, name } = await Map.findOne({ mapId: id })

    res.status(200).json({ mapId, user, location, name })
  } catch (err) {
    res.status(403).json(err)
  }
}

export async function del(req, res) {
  try {
    const { id } = req.params

    await Map.deleteOne({ mapId: id })

    res.sendStatus(200)
  } catch (err) {
    res.status(403).json(err)
  }
}
