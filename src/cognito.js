import * as aws from 'aws-sdk'

export const cognito = new aws.CognitoIdentityServiceProvider({
  region: 'us-west-2',
})
