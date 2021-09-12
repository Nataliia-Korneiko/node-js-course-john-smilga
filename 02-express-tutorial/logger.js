const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const year = new Date().getFullYear();
  console.log('method:', method);
  console.log('url:', url);
  console.log('year:', year);

  next();
};

module.exports = logger;
