export const decode = (str) => {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
};
