import('./configs/app.js')
  .then((m) => console.log('app exports:', Object.keys(m)))
  .catch((e) => { console.error('error importing app:', e); process.exit(1) });
