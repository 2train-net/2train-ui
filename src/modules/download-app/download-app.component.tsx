import React, { FC, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const { REACT_APP_APP_STORE_URL, REACT_APP_PLAY_STORE_URL } = process.env;

const DownloadApp: FC = () => {
  useEffect(() => {
    if (
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i)
    ) {
      window.location.href = REACT_APP_APP_STORE_URL!;
    } else if (navigator.userAgent.match(/Android/i)) {
      window.location.href = REACT_APP_PLAY_STORE_URL!;
    }
  }, []);

  return (
    <>
      <LoadingOutlined
        style={{ fontSize: '1500%', minWidth: '0px', display: 'flex', justifyContent: 'center' }}
        className="loading-spinner"
        spin
      />
    </>
  );
};

export default DownloadApp;
