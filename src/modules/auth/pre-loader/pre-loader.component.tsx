import React, { FC, useState, useEffect } from 'react';

import { Progress } from 'antd';

enum Status {
  NORMAL = 'normal',
  ACTIVE = 'active',
  SUCCESS = 'success',
  EXCEPTION = 'exception'
}

interface IPreLoader {
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsDone: (value: boolean) => void;
}

const PreLoader: FC<IPreLoader> = ({ isLoading, isAuthenticated, setIsDone }) => {
  const [count, setCounter] = useState<number>(0);
  const [status, setStatus] = useState<Status>();

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCounter(counter => {
          if (counter < 99) {
            return counter + 1;
          }
          clearInterval(intervalId);
          return counter;
        }),
      10
    );

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setStatus(isAuthenticated ? Status.SUCCESS : Status.EXCEPTION);
      setInterval(() => {
        setIsDone(true);
      }, 250);
    }
  }, [isAuthenticated, isLoading, setIsDone]);

  return <Progress type="circle" percent={count} status={status} />;
};

export default PreLoader;
