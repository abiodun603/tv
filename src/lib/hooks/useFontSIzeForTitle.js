const getFontSizeForCardTitle = (title) => {
  const originFontSize = 18;
  const maxDisplayCharInLine = 20;
  const minFontSize = 14.5;
  const optimalSize = 16;

  let fontSize = Math.min(
    originFontSize,
    originFontSize / (title.length / maxDisplayCharInLine)
  );
  if (fontSize < minFontSize) {
    fontSize = optimalSize;
  }
  return fontSize;
};

export default getFontSizeForCardTitle;
