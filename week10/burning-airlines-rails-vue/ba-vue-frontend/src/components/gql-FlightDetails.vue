<template>
<div>
  <h2>Flight Details</h2>


    <div class="seating" v-if="flight.origin">


      <div class="planeRow" v-for="row in flight.airplane.rows">
        <div class="seat rowNumber">{{ row }}</div>

        <div
          class="seat"
          v-bind:class="seatStatus(row, col)"
          v-for="col in flight.airplane.cols"
        >
         {{ String.fromCharCode(64 + col) }}
        </div>

        <div class="seat rowNumber">{{ row }}</div>
      </div><!-- .planeRow -->

    </div><!-- .seating -->

</div>
</template>

<script>
import gql from 'graphql-tag';
import axios from 'axios';
export default {
  name: 'FlightDetails',
  // props: ['id'], //defines the props we receive (from the router, in this example)
  props: {
    id: {
      // type: Number,   // type checking!
      required: true  // non-optional
    }
  },
  data(){
    return {
      flight: {},
      // hello: 'nuthin'
      // flights: []
    };
  },

  apollo: {
    // Simple query that will update the 'hello' vue property
    // flights: gql`query {
    //   flights {
    //     origin
    //     destination
    //   }
    // }`
    flight: {
      query: gql`query flightDetail($id: ID!){
        flight(id: $id) {
          origin
          destination
          airplane {
            rows
            cols
            name
          }
        }
      }`,
      variables() {
        return {
          id: this.id
        };
      }
    }
      // flight: gql`query flightDetails($id: ID!){
      //   flight(id: $id){
      //     origin
      //     destination
      //     airplane {
      //       rows
      //       cols
      //     }
      //   }
      // }`,
      // variables: {
      //   id: 1
      // }
    },

  create(){
    // axios.get(`http://localhost:3000/flights/${this.id}`)
    axios.post('http://localhost:3000/graphql', {
      query: `
{
  flight(id: ${this.id}) {
    id
    flightNumber
    departureDate
    origin
    destination
    airplane {
      name
      rows
      cols
    }
    reservations {
      user {
        name
        email
      }
      row
      col
    }
  }
}
      `
    })
    .then( res => {
      console.log(res);
      this.flight = res.data;
      // this.flight = { ...res.data.data.flight, plane: {...res.data.data.flight.airplane} };
    });
  },

  methods: {
    // seatStatus: function(){
    seatStatus(row, col){
      // console.log('seat render:', row, col);

      // actually work out if this row, col is taken (ie. is it in the reservations?)

      return Math.random() > 0.5 ? 'occupied' : 'mine';
    },



  }

}
</script>

<style scoped>
.seat {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #CCCCCC;
  margin-bottom: 6px;
  margin-right: 6px;
  cursor: pointer;
}
.rowNumber {
  border: none;
}
.occupied {
  background-color: grey;
  pointer-events: none;
}
.mine {
  background-color: orange;
}
</style>
