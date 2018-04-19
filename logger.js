module.exports = {
  info: (log) => {
    console.log(`[TREKI-API] [INFO] ${log}`);
  },
  error: (err) => {
    console.log(`[TREKI-API] [ERROR] ${err}`);
  }
}