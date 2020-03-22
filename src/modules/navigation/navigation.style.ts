import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    '& header': {
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
        left: 15,
        top: 10,
        bottom: 10
      }
    }
  }
});
