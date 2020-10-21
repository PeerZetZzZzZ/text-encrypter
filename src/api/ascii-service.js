export const ASCII_CHARACTERS = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ';

export const isAscii = (data) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < data.length; i++) {
    const dataChar = data.charAt(i);
    let isCharAscii = false;
    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < ASCII_CHARACTERS.length; k++) {
      if (dataChar === ASCII_CHARACTERS.charAt(k)) {
        isCharAscii = true;
        break;
      }
    }
    if (!isCharAscii) {
      console.log(`Found character in password ${dataChar} which is not ASCII! Cannot encrypt.`);
      return false;
    }
  }
  return true;
};
