import { Auth } from "aws-amplify";
export default {
  Auth: {
    identityPoolId: 'eu-west-1:53b76f45-ac17-452e-a012-a8d9dcfd9160',
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_p19Y22Ov5',
    userPoolWebClientId: '3ia2e8h2g8309mgbn2l6ushuqk',
  },
  Storage: {
    AWSS3: {
      bucket: 'gram-to-store-images', //REQUIRED -  Amazon S3 bucket
      region: 'eu-west-1', //OPTIONAL -  Amazon service region
    }
  }
}