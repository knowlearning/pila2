import { createApp } from 'vue'
import { createStore } from 'vuex'
import { browserAgent, vuePersistentStore } from '@knowlearning/agents'
import './style.css'
import storeDef from './store/index.js'
import App from './App.vue'

window.Agent = browserAgent()

async function initialize() {

  const store = await vuePersistentStore(storeDef)
  console.log('hmmm', store)

  const app = createApp(App)
  app.use(createStore(store))
  app.mount('#app')
}

initialize()