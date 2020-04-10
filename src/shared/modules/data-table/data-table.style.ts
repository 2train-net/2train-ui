import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: {
    margin: {
      top: 20
    },
    '& .data-table-actions:first-child': {
      display: 'flex',
      justifyContent: 'space-between',
      margin: {
        top: 16,
        bottom: 16
      },
      '& div:first-child': {
        '& button': {
          margin: {
            right: 15
          }
        }
      },
      '& div:last-child': {
        '& button': {
          margin: {
            left: 15
          }
        }
      }
    }
  }
});
