import app from './app.js'
import roles from './roles.js'

export default {
  modules: {
    app,
    roles
  },
  state: {},
  plugins: [
    store => {
      store.dispatch('app/load')
      store.dispatch('roles/load')
    }
  ]
}
