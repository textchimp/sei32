<template>
<div>
  <h2>Search for Flights</h2>
  <div class="searchForm">

    <label>Origin:</label>
    <select v-model="origin">
      <option value="">Please select:</option>
      <option>SYD</option>
      <option>SFO</option>
      <option>SIN</option>
      <option>JFK</option>
    </select>

    &nbsp; &nbsp;

    <label>Destination:</label>
    <select v-model="destination">
      <option value="">Please select:</option>
      <option>SYD</option>
      <option>SFO</option>
      <option>SIN</option>
      <option>JFK</option>
    </select>

    &nbsp; &nbsp;

    <button v-on:click="submitSearch">Search Flights</button>

  </div><!-- .searchForm -->

</div>
</template>


<script>
export default {

  name: 'FlightSearch',

  data(){
    return {
      origin: 'SYD',
      destination: 'SIN'
    };
  },

  methods: {
    submitSearch(){
      console.log('submit!', this.origin, this.destination);
      // go to new route: /search/SYD/SIN
      // redirect_to results_path(origin, destination)
      this.$router.push({
        name: 'flightSearchResults',
        params: {
          origin: this.origin,
          destination: this.destination
        }
      });

    }
  }


}
</script>

<style scoped>

</style>
