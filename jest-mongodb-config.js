module.exports = {
    mongodbMemoryServerOptions: {
      binary: {
        version: '4.11.0',
        skipMD5: true,
      },
      autoStart: false,
      instance: {
        dbName: "jest"
      },
    },
};