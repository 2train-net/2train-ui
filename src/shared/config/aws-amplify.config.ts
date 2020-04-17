import Amplify from 'aws-amplify';

const {
  REACT_APP_COGNITO_REGION,
  REACT_APP_COGNITO_USER_POOL_ID,
  REACT_APP_COGNITO_REGION_WEB_CLIENT_ID
} = process.env;

Amplify.configure({
  Auth: {
    region: REACT_APP_COGNITO_REGION,
    userPoolId: REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: REACT_APP_COGNITO_REGION_WEB_CLIENT_ID
  }
});
