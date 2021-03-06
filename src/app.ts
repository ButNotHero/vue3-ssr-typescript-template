import { createSSRApp, createApp, h } from 'vue';
import isSSR from '@/_base/isSSR';
import App from './App.vue';
import router from './router';
import * as nativeStore from './store/useNativeStore';
import * as vuexStore from './store/useVuexStore';

import './assets/scss/styles.scss';

export default function (args: any) {
  const rootComponent = {
    render: () => h(App),
    components: { App },
    setup() {
      nativeStore.provideStore(args.nativeStore);
      vuexStore.provideStore(args.vuexStore);
    },
  };

  const app = (isSSR ? createSSRApp : createApp)(rootComponent);

  app.use(router);
  app.use(args.vuexStore);

  return {
    app,
    router,
  };
}
