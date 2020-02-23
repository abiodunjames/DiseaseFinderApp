import { Auth } from "aws-amplify";
export default {
  Auth: {
    identityPoolId: 'XXXXX',
    region: 'eu-west-1',
    userPoolId: 'XXXXX',
    userPoolWebClientId: 'XXXXX',
  },
  Storage: {
    AWSS3: {
      bucket: 'XXXXXX', //REQUIRED -  Amazon S3 bucket
      region: 'eu-west-1', //OPTIONAL -  Amazon service region
    }
  }
}