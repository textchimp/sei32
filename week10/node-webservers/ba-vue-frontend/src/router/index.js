import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import FlightSearch from '@/components/FlightSearch'
import FlightSearchResults from '@/components/FlightSearchResults'
import FlightDetails from '@/components/FlightDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/search',
      name: 'flightSearch',
      component: FlightSearch
    },
    {
      path: '/search/:origin/:destination',
      name: 'flightSearchResults',
      component: FlightSearchResults,
      props: true
    },
    {
      path: '/flights/:id',
      name: 'flightDetails',
      component: FlightDetails,
      props: true
    },
    // <route exact path="/" component= { HelloWord } />
  ]
})
