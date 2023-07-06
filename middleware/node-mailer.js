import nodemailer from 'nodemailer';
import { config } from '../config.js';
// console.log(config.mailer.id);

export function generateRandom(min, max) {
  const ranNum = Math.floor(Math.random()*(max-min+1)) + min;
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
      return res.status(400).json({message: error});
    }
    else{
      console.log(info);
      // return info.response;
      return next();
    }
  })
}

export async function sendEmail(code, email){
  let email_data ={
    from: "purnsup90@gmail.com",
    to: email,
    subject: "인증 관련 이메일 입니다.",
    text: "오른쪽 숫자 6자리를 입력해주세요: " + code
  }
  await send(email_data);
}


