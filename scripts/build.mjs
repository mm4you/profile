import {spawnSync} from 'node:child_process';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pages=process.argv.includes('--github-pages');
const env={...process.env,
  NEXT_PUBLIC_BASE_PATH:pages?'/profile':'',
  NEXT_PUBLIC_SITE_URL:pages?'https://mm4you.github.io/profile/':'https://www.ungnhutkhang.id.vn/'
};
const build=spawnSync(process.execPath,[resolve(root,'site/node_modules/next/dist/bin/next'),'build','--webpack'],{cwd:resolve(root,'site'),env,stdio:'inherit'});
if(build.error) throw build.error;
if(build.status!==0) process.exit(build.status||1);
const publish=spawnSync(process.execPath,[resolve(root,'scripts/export-pages.mjs')],{cwd:root,stdio:'inherit'});
if(publish.error) throw publish.error;
process.exit(publish.status||0);
