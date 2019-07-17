import axios from 'axios';

const BASE_URL = 'http://localhost:3333';

const SEARCH_PATH = '/flights/';
const FLIGHT_PATH = '/flights/';
const RESERVATION_PATH = '/reservations';

const GRAPHQL_URL = `${BASE_URL}/graphql`;


export default {

  getFlightSearchResults(origin, destination){
    const url = `${BASE_URL}${SEARCH_PATH}${origin}/${destination}`;
    return axios.get( url );
  },

  getFlightDetails( id ){
    const url = `${BASE_URL}${FLIGHT_PATH}${id}`;
    return axios.get( url );

    // GraphQL version:
    // return axios.post( GRAPHQL_URL, {
    //   query: `
    //   {
    //     flight(id: ${id}) {
    //       id
    //       origin
    //       destination
    //       departureDate
    //       reservations {
    //         row
    //         col
    //       }
    //       plane {
    //         rows
    //         cols
    //         name
    //       }
    //     }
    //   }
    //   `
    // });
  },

  createReservation(row, col, flight_id, user_id){
    const url = `${BASE_URL}${RESERVATION_PATH}`;
    return axios.post( url, {
      row, col, flight_id, user_id
    });
  }

};
