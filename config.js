import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined){
  // console.log(key);
  const value =  process.env[key] || defaultValue;
  // console.log(value);
  // console.log(defaultValue);
  if(value == null){
    
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  // jwt: {
  //   secretKey : required('JWT_SECRET'),
  //   expiresInSec : parseInt(required('JWTEXPIRES_SEC', 86400))

  // },
  // bcrypt:{
  //   saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12))
  // },
  jwt: {
    secretKey : required('JWT_SECRET'),
    expiresInSec : parseInt(required('JWTEXPIRES_SEC', 86400))

  },
  host: {
    port: parseInt(required("HOST_PORT", 8080))
  },
  db: {
    host :required('DB_HOST'),
  },
  render: {
    host: required('HOST')
  },
  mailer: {
    id: required('MAILER_ID'),
    pass: required('MAILER_PASS')
  },
  bcrypt:{
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12))
  }
}