const {app,BrowserWindow,ipcMain,shell,dialog}=require('electron');
const path=require('node:path'); const fs=require('node:fs');
const engine=require('./engine.cjs');
let win;
const savePath=()=>path.join(app.getPath('userData'),'investigation.json');
app.whenReady().then(()=>{
  ipcMain.handle('case:load',()=>JSON.parse(fs.readFileSync(path.join(__dirname,'../dist/case.json'),'utf8')));
  ipcMain.handle('save:load',()=>{try{return JSON.parse(fs.readFileSync(savePath(),'utf8'));}catch{return null;}});
  ipcMain.handle('save:write',(_,data)=>{
    const raw=JSON.stringify(data); if(raw.length>2_000_000) throw new Error('Save is too large');
    const p=savePath(); fs.writeFileSync(p+'.tmp',raw);fs.renameSync(p+'.tmp',p); return true;
  });
  ipcMain.handle('case:check',(_,data)=>engine.validate(data));
  ipcMain.handle('case:hint',(_,data)=>engine.hint(data));
  ipcMain.handle('case:reveal',(_,data)=>engine.reveal(data));
  ipcMain.handle('pdf:open',async(_,name)=>{
    if(!/^(he|en)(-print)?\.pdf$/.test(name))throw new Error('Invalid document');
    const p=app.isPackaged?path.join(process.resourcesPath,'dossiers',name):path.join(__dirname,'../public/dossiers',name);
    const error=await shell.openPath(p);if(error)throw new Error(error);return true;
  });
  ipcMain.handle('app:exit',()=>app.quit());
  ipcMain.handle('app:fullscreen',()=>win.setFullScreen(!win.isFullScreen()));
  win=new BrowserWindow({width:1440,height:940,minWidth:960,minHeight:680,title:'CASE FILES',icon:path.join(__dirname,'../build/icon.png'),backgroundColor:'#11262c',autoHideMenuBar:true,webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true}});
  win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
  win.webContents.on('will-navigate',(event,url)=>{if(!url.startsWith('file://'))event.preventDefault();});
  win.loadFile(path.join(__dirname,'../dist/index.html'));
});
app.on('window-all-closed',()=>app.quit());
