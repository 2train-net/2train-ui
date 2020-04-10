import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    '& .register-form-title': {
      textAlign: 'center',
      margin: {
        top: 20,
        bottom: 40
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
