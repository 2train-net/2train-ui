import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    '& .login-form-title': {
      textAlign: 'center',
      margin: {
        top: 20,
        bottom: 40
      }
    },
    '& .forgot-password': {
      float: 'right'
    },
    '& .other-login-options': {
      margin: {
        top: 60
      },
      '& .ant-form-item-control-input-content': {
        display: 'flex',
        justifyContent: 'space-around',
        '& button': {
          width: 160
        },
        '& button:first-child': {
          color: '#3B5998'
        },
        '& button:last-child': {
          color: '#DB4437'
        }
      }
    },
    '& .register-link': {
      textAlign: 'center',
      margin: {
        top: 60
      },
      '& a': {
        color: 'gray'
      }
    }
  }
});
