const getBase64 = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  // reader.onload = () => {
  //   reader.result;
  // };
  return reader;
};

export default getBase64;
