import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    minHeight: '100vh',
    '& .logo': {
      height: 32,
      background: 'orange',
      margin: 16
    },
    '& header': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: {
        right: 15,
        left: 15
      },
      '& span': {
        fontSize: 20
      }
    },
    '& main': {
      padding: {
        right: 15,
        left: 15
      }
    }
  }
});
