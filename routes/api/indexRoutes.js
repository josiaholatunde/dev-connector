module.exports = app => {
  app.get('/api/test', (req, res, next) => {
    res.send('Hello from the other side');
  })
}