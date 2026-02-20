import('./configs/cors-configurations.js')
  .then((m) => console.log('cors exports:', Object.keys(m)))
  .catch((e) => { console.error('error importing cors:', e); process.exit(1) });
