import { SignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import { cognito } from '../../cognito'

export async function post(req, res) {
  try {
    const { username, password, email } = req.body

    if (!username || !password || !email)
      throw new Error('Missing required attributes')

    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Password: password,
      Username: username,
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        }
      ]
    }

    const command = new SignUpCommand(params)
    await cognito.send(command)

    res.sendStatus(201)
  } catch (err) {
    res.status(400).json(err)
  }
}
