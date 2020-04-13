import { createUseStyles } from 'react-jss';

export default createUseStyles({
  root: ({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) => ({
    minHeight: '100vh',
    '& .ant-layout': {
      background: '#FCFCFC'
    },
    '& aside': {
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      '& .logo': {
        height: 32,
        background: 'orange',
        margin: 16
      },
      zIndex: 2
    },
    '& header': {
      zIndex: 1,
      width: '100%',
      display: 'flex',
      position: 'fixed',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: {
        right: 15,
        left: 15
      }
    },
    '& main': {
      overflow: 'initial',
      margin: {
        top: 64,
        left: isSidebarCollapsed ? 80 : 200
      },
      padding: {
        right: 15,
        left: 15,
        top: 10,
        bottom: 10
      }
    }
  })
});
