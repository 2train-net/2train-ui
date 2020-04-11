import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    position: 'fixed',
    display: 'flex',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    '& .auth-form:first-child': {
      width: 370,
      height: 532,
      minWidth: 320
    }
  }
});
