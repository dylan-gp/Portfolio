import axios from 'axios';

export async function sendEmail(msg) {
  try {
    const res = await axios.post('https://send-email-portfolio.herokuapp.com/sendEmail', { msg });
    return res;
  } catch(err) {
    return err;
  }
}
