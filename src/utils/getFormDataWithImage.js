export const getFormDataWithImage = (file) => {
  if (file.length > 1) {
    return {
      error: true,
      message: 'only single file',
    };
  }

  if (!file || !file.length) {
    return {
      error: true,
      message: 'wrong format',
    };
  }

  const fd = new FormData();
  fd.append('path', 'photo');
  fd.append('files', file[0]);

  return fd;
};
