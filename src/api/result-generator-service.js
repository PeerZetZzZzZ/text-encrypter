export const generateEncryptionResult = (encryptedData, iv, sha256Used) => {
  const resultJson = {};
  resultJson.algorithm = 'aes-256-cbc';
  resultJson.encryptedDataHex = encryptedData;
  resultJson.wasEncryptionKeySha256 = sha256Used;
  resultJson.ivVectorHex = iv;
  resultJson.payloadPadding = 'pkcs7';
  resultJson.encryptionDate = new Date();
  return JSON.stringify(resultJson, null, 2);
};
