// Function to generate a random short URL
function generateShortUrl() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let short_url = '';

  for (let i = 0; i <= 9; i++) {
    short_url += characters[Math.floor(Math.random() * characters.length)];
  }

  return short_url;
}
export default generateShortUrl;