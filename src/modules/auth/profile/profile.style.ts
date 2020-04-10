import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    '& .profile-form-title': {
      textAlign: 'center',
      margin: {
        top: 20,
        bottom: 40
      }
    },
    '& .avatar-uploader': {
      display: 'flex',
      justifyContent: 'center',
      '& div:first-child , img': {
        borderRadius: 50
      },
      '& img': {
        width: '100%'
      }
    }
  }
});
