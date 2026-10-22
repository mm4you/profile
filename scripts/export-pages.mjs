import {cpSync,existsSync,readdirSync,rmSync} from 'node:fs';
import {resolve,dirname,relative,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const out=resolve(root,'site/out');
if(!existsSync(resolve(out,'index.html'))) throw new Error('Run npm --prefix site run build first.');
for(const name of ['_next','_not-found','404']) {
  const target=resolve(root,name);
  if(relative(root,target)!==name || !target.startsWith(root+sep)) throw new Error('Unsafe export target.');
  rmSync(target,{recursive:true,force:true});
}
for(const name of readdirSync(out)) cpSync(resolve(out,name),resolve(root,name),{recursive:true,force:true});
console.log('GitHub Pages files exported to repository root.');
