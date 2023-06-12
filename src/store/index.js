import app, { plugin as appPlugin } from './roles.js'
import roles, { plugin as rolesPlugin } from './roles.js'

export default {
  modules: {
    app,
    roles
  },
  state: {},
  plugins: [
    appPlugin,
    rolesPlugin
  ]
}
