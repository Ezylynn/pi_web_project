const crypto = require('crypto');




function encrypt(text, key, iv) {
  const bufferKey = Buffer.from(key, 'hex')
  const bufferIv = Buffer.from(iv,'hex')
  let cipher = crypto.createCipheriv('aes-256-cbc', bufferKey, bufferIv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}


function decrypt(text, key, iv) {
  const bufferKey = Buffer.from(key, 'hex')
  const bufferIv = Buffer.from(iv,'hex')
  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', bufferKey, bufferIv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}



module.exports = { encrypt, decrypt}