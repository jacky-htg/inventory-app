const formFailedSubmit = (
  { values, errorFields, outOfDate },
  setErrorFields
) => {
  if (errorFields.length > 0) {
    const temp = [];
    errorFields.forEach((el) => {
      temp.push(el.name[0]);
    });
    console.log("temp", temp);
    setErrorFields(temp);
  }
};

export default formFailedSubmit;
