const http=require('node:http');const fs=require('node:fs');const path=require('node:path');
const engine=require('../desktop/engine.cjs');
const root=path.resolve(__dirname,'..');
const server=http.createServer(async(req,res)=>{
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  try{
    if(req.method==='GET'&&req.url==='/api/case'){res.end(fs.readFileSync(path.join(root,'public/case.json')));return;}
    const routes={'/api/check':engine.validate,'/api/hint':engine.hint,'/api/reveal':engine.reveal};
    if(req.method!=='POST'||!routes[req.url]){res.writeHead(404);res.end('{}');return;}
    if(req.headers.origin&&!/^http:\/\/127\.0\.0\.1:(5173|5174)$/.test(req.headers.origin)){res.writeHead(403);res.end('{}');return;}
    let body='';for await(const chunk of req){body+=chunk;if(body.length>100000){res.writeHead(413);res.end('{}');return;}}
    res.end(JSON.stringify(routes[req.url](JSON.parse(body||'{}'))));
  }catch{res.writeHead(400);res.end(JSON.stringify({error:'Request could not be processed'}));}
});
server.listen(5174,'127.0.0.1',()=>console.log('Local validation service ready.'));
