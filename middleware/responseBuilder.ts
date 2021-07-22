module.exports = (message: string, code: number, data: any = null) => {
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
