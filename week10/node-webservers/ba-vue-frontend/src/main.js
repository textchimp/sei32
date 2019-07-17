// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// import ApolloClient from 'apollo-boost'

// const apolloClient = new ApolloClient({
//   uri: 'http://localhost:3000/graphql',
//   connectToDevTools: true
// })
//
// import VueApollo from 'vue-apollo'
//
// Vue.use(VueApollo)
//
// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient
// });



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // apolloProvider,
  components: { App },
  template: '<App/>'
})
