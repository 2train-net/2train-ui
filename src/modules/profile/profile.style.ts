import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    '& .profile-form-title': {
      textAlign: 'center',
      margin: {
        top: 16,
        bottom: 16
      }
    },
    '& .avatar-uploader': {
      display: 'flex',
      justifyContent: 'center',
      '& div:last-child , img': {
        borderRadius: 50
      },
      '& img': {
        width: '100%'
      }
    }
  }
});
