const {spawn}=require('node:child_process');
const children=[spawn(process.execPath,['scripts/server.cjs'],{stdio:'inherit'}),spawn(process.execPath,['node_modules/vite/bin/vite.js'],{stdio:'inherit'})];
let stopping=false;
function stop(code=0){if(stopping)return;stopping=true;children.forEach(c=>c.kill('SIGTERM'));setTimeout(()=>process.exit(code),150).unref();}
children.forEach(c=>c.on('exit',code=>stop(code??0)));process.on('SIGINT',()=>stop());process.on('SIGTERM',()=>stop());
