import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    display: 'flex',
    '& div:first-child': {
      width: '100%'
    },
    '& div:last-child': {
      width: '100%'
    }
  }
});
