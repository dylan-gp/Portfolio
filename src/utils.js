import axios from 'axios';

export async function sendEmail(msg) {
  try {
    await axios.get('https://send-email-portfolio.herokuapp.com/');
    const res = await axios.post('https://send-email-portfolio.herokuapp.com/sendEmail', { msg });
    return res;
  } catch(err) {
    return err;
  }
}
