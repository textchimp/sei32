<template>
<div>
  <h2>Flight Details</h2>

    <ReservationConfirm
     v-if="selectedSeat.row && selectedSeat.col"
     :selected-seat="selectedSeat"
     :flight-id="flight.flight_number"
     :user-id="userId"
     @seat-confirmed="seatBooked"
    />

    <div class="confirmation" v-if="confirmationMessage">
      {{ confirmationMessage }}
    </div>

    <div class="seating" v-if="flight.origin">

      <div class="planeRow" v-for="row in flight.plane.rows">
        <div class="seat rowNumber">{{ row }}</div>

        <div
          class="seat"
          v-bind:class="seatStatus(row, col)"
          v-on:click="selectSeat(row, col)"
          v-for="col in flight.plane.cols"
          >
         {{ col | toSeatLetter }}
        </div>

        <div class="seat rowNumber">{{ row }}</div>
      </div><!-- .planeRow -->

    </div><!-- .seating -->

</div>
</template>

<script>

const FAKE_CURRENT_USER_ID = 1;

window.seatIterations = 0;

import ReservationConfirm from './ReservationConfirm';

// import axios from 'axios';
import ajax from '@/lib/ajax';

export default {
  name: 'FlightDetails',
  components: {
    ReservationConfirm  // the current component will render this one as a child
  },

  // props: ['id'], //defines the props we receive (from the router, in this example)
  props: {
    id: {
      // type: Number,   // type checking!
      required: true  // non-optional
    }
  },
  data(){
    return {
      userId: FAKE_CURRENT_USER_ID,
      flight: {},
      userReservations: {},
      reservations: {},
      selectedSeat: {
        row: 0,
        col: 0
      },
      confirmationMessage: ''
    };
  },

  created(){
    // axios.get(`http://localhost:3000/flights/${this.id}`)
    ajax.getFlightDetails( this.id )
    .then( res => {
      console.log(res);
      // GraphQL:
      // this.flight = res.data.data.flight;

      this.flight = res.data.flight;

      this.reservations = res.data.reservations;
      this.userReservations = res.data.user_reservations;
    });
  },

  methods: {

    seatBooked(reservation){
      console.log('booking seat event received!');
      console.log(reservation);
      // clear the selected seat state, which will also
      // remove the ReservationConfirm component from the page
      this.selectedSeat = { row: 0, col: 0 };

      const seatKey = `${reservation.row}:${reservation.col}`;
      this.userReservations[seatKey] = 1;

      this.confirmationMessage = 'Booking successful!';
    },

    selectSeat(row, col){
      // console.log('selected:', row, col);
      this.selectedSeat = { row, col };
      this.confirmationMessage = ''; // clear the last confirmation
    },

    seatStatus(row, col){

      // For this row & col, is there an entry in the reservations array
      // which also has this row & col?
      // for( let i = 0; i < this.flight.reservations.length; i++ ){
      //   const reservation = this.flight.reservations[i];
      //
      //   window.seatIterations++;
      //
      //   // Is the current seat we're trying to render one of reserved seats?
      //   if( row === reservation.row && col === reservation.col ){
      //
      //     if( FAKE_CURRENT_USER_ID === reservation.user_id ){
      //       // This seat was booked by the current user
      //       return 'mine';
      //     } else {
      //       // This seat was booked by someone else
      //       return 'occupied';
      //     }
      //
      //   }
      //
      // } // for

      window.seatIterations++; // just for debugging

      const seatKey = `${row}:${col}`;

      if( seatKey in this.userReservations ){
        return 'mine';
      } else if( row == this.selectedSeat.row && col == this.selectedSeat.col ){
        return 'selected';
      } else if( seatKey in this.reservations ){
        return 'occupied';
      }

      return 'available';  // This will be added to the div's CSS classes
    },

  }, // methods

  filters: {
    // Filters are like Rails template helpers, intended for transforming text in your template
    toSeatLetter( num ){
      return String.fromCharCode(64 + num);
    }

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
.confirmation {
  color: orange;
  font-size: 14pt;
  padding: 20px;
}

/* Seat diagram colour code classes */
.selected {
  background-color: green;
  border: 1px solid lime;
}
.available {
  background-color: white;
}
.occupied {
  background-color: grey;
  pointer-events: none;
}
.mine {
  background-color: orange;
  pointer-events: none;
}
</style>
