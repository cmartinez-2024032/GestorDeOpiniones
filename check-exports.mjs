import('./src/users/user.controller.js')
  .then((m) => {
    console.log('exports:', Object.keys(m));
  })
  .catch((e) => {
    console.error('error importing:', e);
    process.exit(1);
  });
