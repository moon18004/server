import nodemailer from 'nodemailer';
import { config } from '../config.js';
console.log(config.mailer.id);

function generateRandom() {
  let ranNum = Math.floor(Math.random() * (max-min+1))+ min;
  return ranNum;
}


const email = {
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: config.mailer.id,
    pass: config.mailer.pass
  }
};

const send = async (option) => {
  nodemailer.createTransport(email).sendMail(option, (error, info) =>{
    if(error){
      console.log(error);
    }
    else{
      console.log(info);
      return info.response;
    }
  })
}

let email_data = {
  from: "purnsup90@gmail.com",
  to: "purnsup90@naver.com",
  subject: "테스트 메일",
  text: "테스트 메일입니다."
}
send(email_data);