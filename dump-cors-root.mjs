import('./configs/cors-configurations.js')
  .then((m) => console.log('cors root exports:', Object.keys(m)))
  .catch((e) => { console.error('error importing cors root:', e); process.exit(1) });
