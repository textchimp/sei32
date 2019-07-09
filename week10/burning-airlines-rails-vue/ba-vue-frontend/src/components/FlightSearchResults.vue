<template>
<div>
  <h2>Search Results for {{ origin }} to {{ destination }}</h2>

  <div v-if="flights.length === 0">
    <p>Loading results...</p>
  </div>
  <div v-else>

    <div class="container header">
      <div>Departure Date</div>
      <div>Flight Number</div>
      <div>Plane</div>
      <div>Origin</div>
      <div>Destination</div>
    </div>

    <div class="container result"
      v-for="flight in flights"
      v-on:click="gotoFlightDetails(flight.id)"
    >
      <div>{{ flight.departure_date_formatted }}</div>
      <div>{{ flight.flight_number }}</div>
      <div>{{ flight.plane.name }}</div>
      <div>{{ flight.origin }}</div>
      <div>{{ flight.destination }}</div>
    </div>

  </div><!-- v-else -->

</div>
</template>

<script>
// import axios from 'axios';
import ajax from '@/lib/ajax';

export default {
  name: 'FlightSearchResults',
  props: ['origin', 'destination'], // these come from the router in this case

  // State for this component:
  data(){
    return {
      flights: []  // this will be filled in by our AJAX response
    };
  },

  // Vue component lifecycle method: this is run when the component is created
  // i.e. same as React's componentDidMount()
  created(){

    ajax.getFlightSearchResults(this.origin, this.destination)
    .then( res => {
      console.log('response', res);
      this.flights = res.data;  // Set the results into our component state; no need for this.setState()
      // BUT! Beware of changing elements inside arrays - this will not be noticed by Vue...
    })
    .catch( err => {
      console.warn('search error', err);
    });

  },

  methods: {

    gotoFlightDetails(flightID){
      this.$router.push({
        name: 'flightDetails',
        params: {
          id: flightID
        }
      });
    }

  }

}
</script>


<style>
.container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr; /* total of five columns for each row, first column is double the width */
  padding-top: 8px;
  padding-bottom: 8px;
}

.header {
  background-color: rgb(30, 28, 101);
  color: white;
}

.result {
  cursor: pointer;
}

.result:hover {
  background-color: #EEEEEE;
  font-weight: bold;
}
</style>
