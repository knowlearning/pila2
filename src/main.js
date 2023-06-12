import { createApp } from 'vue'
import { browserAgent, vuePersistentStore } from '@knowlearning/agents'
import './style.css'
import storeDef from './store/index.js'
import App from './App.vue'

window.Agent = browserAgent()

async function initialize() {
  const app = createApp(App)

  const store = await vuePersistentStore(storeDef)

  app.use(store)
  app.mount('#app')
}

initialize()