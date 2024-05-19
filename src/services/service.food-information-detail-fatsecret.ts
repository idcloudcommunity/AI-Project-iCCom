// import axios from 'axios';
// import { createHmac } from 'crypto';

// // Fungsi untuk menghasilkan nonce secara acak
// function generateNonce(length: number): string {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

// // Fungsi untuk membuat tanda tangan OAuth
// function generateOAuthSignature(httpMethod: string, baseUrl: string, params: any, consumerSecret: string): string {
//   const parameterString = Object.keys(params)
//     .sort()
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     .join('&');

//   const baseString = `${httpMethod.toUpperCase()}&${encodeURIComponent(baseUrl)}&${encodeURIComponent(parameterString)}`;

//   const signingKey = `${encodeURIComponent(consumerSecret)}&`;
//   return createHmac('sha1', signingKey).update(baseString).digest('base64');
// }

// // Definisi parameter-parameter OAuth
// const oauthParams = {
//   oauth_consumer_key: 'YourConsumerKey',
//   oauth_nonce: generateNonce(32),
//   oauth_signature_method: 'HMAC-SHA1',
//   oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
//   oauth_version: '1.0'
// };

// // Consumer secret key - Anda perlu menyimpan ini secara aman
// const consumerSecret = 'YourConsumerSecret';

// // Base URL dan endpoint
// const baseUrl = 'https://platform.fatsecret.com/rest/server.api';
// const endpoint = '';

// // Generate OAuth signature
// oauthParams.oauth_signature = generateOAuthSignature('POST', baseUrl + endpoint, oauthParams, consumerSecret);

// // Lakukan permintaan Axios
// axios.post(baseUrl + endpoint, null, {
//   params: oauthParams
// })
// .then(response => {
//   // Tanggapan berhasil
//   console.log('Response:', response.data);
// })
// .catch(error => {
//   // Tanggapan gagal
//   console.error('Error:', error);
// });
