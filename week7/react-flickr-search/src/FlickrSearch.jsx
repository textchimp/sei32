import React, { Component } from 'react';

import axios from 'axios';

import SearchForm from './SearchForm';


const generatePhotoURL = ( photo, size='q' ) => {
  return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
};

// Pure functional component: an easier way to define components which don't
// need any state or event handler methods: just define them as functions which
// take a props object as their argument, and return the JSX to render.
const SearchResults = props => {
  return props.photos.map( photo => <img src={ generatePhotoURL(photo) } alt={ photo.title } /> );
};


class FlickrSearch extends Component {

  constructor(){
    super();

    this.state = {
      photos: []
    };

  }

  performSearch = (query) => {
    console.log('FlickrSearch.performSearch(): query = ', query);

    const URL = 'https://api.flickr.com/services/rest/';
    const flickrParams = {
      api_key: '2f5ac274ecfac5a455f38745704ad084',
      method: 'flickr.photos.search',
      text: query,
      format: 'json',
      nojsoncallback: 1,
      page: 1
    };

    axios.get( URL, { params: flickrParams } )   // $.getJSON
    // axios uses Promises, so we attach a .then() instead of a .done()
    .then( res => {
      console.log( res );
      this.setState({ photos: res.data.photos.photo })
    })
    // When using Promises, we use .catch() instead of .fail()
    .catch( err => {
      console.warn( err );
    });

  }

  render(){
    return (
      <div>
        <h1>Flickr Search</h1>
        <hr />

        <SearchForm onFormSubmit={ this.performSearch } />

        <SearchResults photos={ this.state.photos } />

      </div>
    );
  }

}

export default FlickrSearch;
