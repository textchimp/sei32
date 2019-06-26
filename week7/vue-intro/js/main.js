

Vue.component('dogs-form', {
  props: [ 'roundness', 'title', 'message' ]  ,
  // In a Vue component, from which many
  // instances might be rendered, your
  // component's data has to be a function
  // that returns an object containing the
  // variables you need for your component.
  data: function(){
    return {
      name: '',
      age: '',
      // roundness: 5
    };
  },
  template: `
  <div>
    <h4>{{ title }} (roundness: {{ roundness }})</h4>
    Name: <input v-model="name" type="text"><br>
    Age: <input v-model="age" type="text"><br>
    <br>
    {{ message }}
  </div>
  `
});

const myApp = new Vue({
  // Where does this app live in the DOM:
  el: '#app',

  // What is the data (state) for this app:
  data: {
    message: 'Hello Vuorld!',
    loadTime: 'You loaded this page on ' + new Date().toLocaleString(),
    canSee: true,
    hasErrors: false,
    status: 'noErrors',
    todoList: [
      { text: 'Learn Vue.js' },
      { text: 'Finish homework' },
      { text: 'Relax' },
    ],

    dogs: []

  },

  // What are the methods our app might need to run:
  methods: {
    reverseMessage: function(){
      this.message = this.message.split('').reverse().join('');
    }
  },

  // Like jQuery's $(document).ready(), but for
  // Vue: created() will be run when the DOM is
  // loaded and the Vue app has been mounted on
  // the DOM
  created: function(){
    console.log('Ready!');

    $.getJSON('http://localhost:3000/dogs.json')
    .done( res => {
      // console.log( res );
      this.dogs = res;
    });

  }

});
