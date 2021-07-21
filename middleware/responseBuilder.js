module.exports = (message, code, data = null) => {
  if (data) {
    return {
      message: message,
      code: code,
      data: data,
    };
  } else {
    return {
      message: message,
      code: code,
    };
  }
};
