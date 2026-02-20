import('file://' + new URL('../configs/cors-configurations.js', import.meta.url).pathname)
  .then((m) => console.log('cors abs exports:', Object.keys(m)))
  .catch((e) => { console.error('error importing cors abs:', e); process.exit(1) });
