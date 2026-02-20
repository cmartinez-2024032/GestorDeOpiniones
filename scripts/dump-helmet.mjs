import('./configs/helmet.js')
  .then((m) => console.log('helmet exports:', Object.keys(m)))
  .catch((e) => { console.error('error importing helmet:', e); process.exit(1) });
