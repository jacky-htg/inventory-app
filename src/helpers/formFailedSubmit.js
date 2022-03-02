import { message } from "antd";

const formFailedSubmit = ({ values, errorFields, outOfDate }) => {
  if (errorFields.length > 0) {
    errorFields.forEach((error) => {
      error.errors.forEach((el, id) => {
        message.error(el);
      });
    });
  }
};

export default formFailedSubmit;
