import { message } from 'antd';

const GENERIC_ERROR = 'Un error desconocido a ocurrido';

class Message {
  success(text: string = GENERIC_ERROR) {
    message.success(text);
  }

  error(text: string = GENERIC_ERROR) {
    message.error(text);
  }

  warning(text: string = GENERIC_ERROR) {
    message.warning(text);
  }

  info(text: string = GENERIC_ERROR) {
    message.info(text);
  }
}

const uniqueInstance = new Message();

export default uniqueInstance;
