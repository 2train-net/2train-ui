import { useEffect } from 'react';

import { ApolloError } from '@apollo/client';

import { Message } from 'shared/modules';
import { SOMETHING_WENT_WRONG_EXCEPTION_TEXT } from 'shared/constants';

const useErrorHandler = (error: ApolloError | undefined) => {
  useEffect(() => {
    if (error) {
      Message.error(error?.graphQLErrors[0]?.message || SOMETHING_WENT_WRONG_EXCEPTION_TEXT);
    }
  }, [error]);
};

export default useErrorHandler;
