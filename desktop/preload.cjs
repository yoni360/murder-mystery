const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('caseFiles',{
  load:()=>ipcRenderer.invoke('case:load'),
  loadSave:()=>ipcRenderer.invoke('save:load'),
  save:data=>ipcRenderer.invoke('save:write',data),
  check:data=>ipcRenderer.invoke('case:check',data),
  hint:data=>ipcRenderer.invoke('case:hint',data),
  reveal:data=>ipcRenderer.invoke('case:reveal',data),
  pdf:name=>ipcRenderer.invoke('pdf:open',name),
  exit:()=>ipcRenderer.invoke('app:exit'),
  fullscreen:()=>ipcRenderer.invoke('app:fullscreen')
});
