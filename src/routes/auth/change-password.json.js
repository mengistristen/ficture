import { cognito } from '../../cognito'

export async function post(req, res) {
  try {
    const { AccessToken, PreviousPassword, ProposedPassword } = req.body
    const params = {
      AccessToken,
      PreviousPassword,
      ProposedPassword
    }

    await cognito.changePassword(params).promise()
    res.sendStatus(200)
  } catch (err) {
    res.status(400).json(err)
  }
}
