const crypto = require('crypto');

function generateKeyAndIV() {
  return {
    key: crypto.randomBytes(32),
    iv: crypto.randomBytes(16)   
  };
}


function encrypt(text, key, iv) {
  let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}


function decrypt(text, key, iv) {
  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}


module.exports = {generateKeyAndIV, encrypt, decrypt}