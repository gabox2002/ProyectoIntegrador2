const images = {};
const req = require.context('../assets/images/', true, /\.(jpg|jpeg|png)$/);

req.keys().forEach((key) => {
  images[key] = req(key);
});

export default images;