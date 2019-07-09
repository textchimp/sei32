<template>
<div class="selection">
  <h4>Your Seat Selection:</h4>
  <div class="seat">
    {{ selectedSeat.row}}{{ selectedSeat.col | toSeatLetter }}
  </div>

  <div class="confirm" @click="confirmSeat()">Confirm Seat</div>

</div>
</template>

<script>
// import axios from 'axios';
import ajax from '@/lib/ajax';

export default {
  name: 'ReservationConfirm',
  props: ['selectedSeat', 'flightId', 'userId'],
  // the parent component is passing this prop to us, in this case as an attribute of the component tag, i.e. <ReservationConfirm selected-seat="something" />

  filters: {
    // Filters are like Rails template helpers, intended for transforming text in your template
    toSeatLetter( num ){
      return String.fromCharCode(64 + num);
    }
  },

  methods: {

    confirmSeat(){

      // axios.post('http://localhost:3000/reservations',{
      //   row: this.selectedSeat.row,
      //   col: this.selectedSeat.col,
      //   flight_id: this.flightId,
      //   user_id: this.userId // DON'T ACTUALLY DO THIS!!!
      // })

      ajax.createReservation(
        this.selectedSeat.row,
        this.selectedSeat.col,
        this.flightId,
        this.userId
      )
      .then( response => {
        console.log('success', response);
        this.$emit('seat-confirmed', response.data.reservation)
      })
      .catch( err => {
        console.warn('reservation create error', err);
      });


    }

  }

}
</script>

<style scoped>
.seat {
  font-size: 16pt;
  font-weight: bold;
  padding-bottom: 10px;
}
.selection {
  border: 1px solid green;
  max-width: 80%;
  margin: 0 auto 20px;
}
.confirm {
  width: 100px;
  height: 20px;
  max-width: 80%;
  margin: 0 auto 20px;
  background-color: green;
  color: white;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid grey;
  box-shadow: 5px 5px 10px grey;
  cursor: pointer;
}
.confirm:hover{
  font-weight: bold;
  box-shadow: 10px 10px 20px grey;

}
</style>
