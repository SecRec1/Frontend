// NODE_ENV=production



// module.exports = {
//   devServer: {
//     host: 'localhost',
//     port: 3000
//   }
// };
const production = process.env.NODE_ENV === 'production';

module.exports = {
  production,
  devServer: {
    host: 'localhost',
    port: 3000
  }
};