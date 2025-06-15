const bcrypt = require('bcryptjs');

const plain = 'CaykarA61.';

bcrypt.hash(plain, 12).then(hash => {
  console.log('Oluşturulan Hash:', hash);

  bcrypt.compare(plain, hash).then(result => {
    console.log('Şifre eşleşti mi?', result);
  });
});
