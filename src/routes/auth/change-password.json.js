import { ChangePasswordCommand } from '@aws-sdk/client-cognito-identity-provider'
import { cognito } from '../../cognito'

export async function post(req, res) {
  try {
    const { AccessToken, PreviousPassword, ProposedPassword } = req.body
    const params = {
      AccessToken,
      PreviousPassword,
      ProposedPassword
    }

    const command = new ChangePasswordCommand(params)
    await cognito.send(command)
    res.sendStatus(200)
  } catch (err) {
    res.status(400).json(err)
  }
}
