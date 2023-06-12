import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../admin/index.vue'
import ResearcherView from '../researcher/index.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/admin',
      component: AdminView
    },
    {
      path: '/researcher',
      component: ResearcherView
    }
  ]
})
