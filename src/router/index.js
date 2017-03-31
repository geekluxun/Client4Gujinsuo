import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Note from '@/components/Note'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }    ,
    {
      path: '/Note',
      name: 'Note',
      component: Note
    }
  ]
})
