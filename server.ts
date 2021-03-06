// @ts-ignore
import path from 'path';
// @ts-ignore
import express from 'express';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
import serialize from 'serialize-javascript';
import { renderToString } from '@vue/server-renderer';
// @ts-ignore
import manifest from './dist/server/ssr-manifest.json';
import { VUE_APP_EXPRESS_PORT } from './env';

const server = express();

const appPath = path.join(__dirname, './dist', 'server', manifest['app.js']);
const createAppAsync = import(appPath);

server.use('/img', express.static(path.join(__dirname, './dist', 'img')));
server.use('/js', express.static(path.join(__dirname, './dist', 'js')));
server.use('/css', express.static(path.join(__dirname, './dist', 'css')));
server.use('/fonts', express.static(path.join(__dirname, './dist', 'fonts')));
server.use('/favicon.ico', express.static(path.join(__dirname, './dist', 'favicon.ico')));

const renderState = (store: { [id: string]: any }, windowKey: string) => {
  const state = serialize(store);
  const autoRemove =
    ';(function(){var s;(s=document.currentScript||document.scripts[document.scripts.length-1]).parentNode.removeChild(s);}());';
  const nonceAttr = store.nonce ? ` nonce="${store.nonce}"` : '';
  return store ? `<script${nonceAttr}>window.${windowKey}=${state}${autoRemove}</script>` : '';
};

server.get('*', async (req, res) => {
  const createApp = await createAppAsync;
  const {
    app,
    vuexStore,
    nativeStore,
    router,
  } = await createApp.default();

  router.push(req.url);

  await router.isReady();

  let appContent = await renderToString(app);

  fs.readFile(path.join(__dirname, '/dist/index.html'), (err, html) => {
    if (err) {
      throw err;
    }

    appContent = `<div id="app">${renderState(vuexStore.state, '__INITIAL_STATE__')}${renderState(
      nativeStore,
      '__INITIAL_NATIVE_STATE__',
    )}${appContent}</div>`;

    const str = html.toString()
      .replace(new RegExp('<div id="app".*></div>'), `${appContent}`);
    res.setHeader('Content-Type', 'text/html');
    res.send(str);
  });
});

const port = process.env.PORT || VUE_APP_EXPRESS_PORT || 3000;

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
