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
  isLogged: boolean;
  setIsDone: (value: boolean) => void;
}

const PreLoader: FC<IPreLoader> = ({ isLoading, isLogged, setIsDone }) => {
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
      25
    );

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setStatus(isLogged ? Status.SUCCESS : Status.EXCEPTION);
      setInterval(() => {
        setIsDone(true);
      }, 250);
    }
  }, [isLogged, isLoading, setIsDone]);

  return <Progress type="circle" percent={count} status={status} />;
};

export default PreLoader;
