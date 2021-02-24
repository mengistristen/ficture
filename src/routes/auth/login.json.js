import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider'
import { cognito } from '../../cognito'

export async function post(req, res) {
  try {
    const { username, password } = req.body

    if (!username || !password) throw new Error('Missing required attributes')

    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
    }

    const command = new InitiateAuthCommand(params)
    const response = await cognito.send(command)
    const { AccessToken, RefreshToken } = response.AuthenticationResult

    req.session.username = username
    req.session.access_token = AccessToken
    req.session.refresh_token = RefreshToken

    res.status(201).json({
      username,
      access_token: AccessToken,
      refresh_token: RefreshToken
    })
  } catch (err) {
    res.status(400).json(err)
  }
}

export async function put(req, res) {
  try {
    const { refresh_token } = req.body

    const params = {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: refresh_token
      }
    }

    const command = new InitiateAuthCommand(params)
    const response = await cognito.send(command)

    res
      .status(200)
      .json({ access_token: response.AuthenticationResult.AccessToken })
  } catch (err) {
    res.status(400).json(err)
  }
}
