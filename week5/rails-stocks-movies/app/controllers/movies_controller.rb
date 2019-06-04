class MoviesController < ApplicationController

  # These constants will be visible in every method
  # of this class
  API_KEY = '___REDACTED___'
  BASE_URL = 'https://api.themoviedb.org/3'

  def form
  end

  def search

    url = "#{ BASE_URL }/search/movie?api_key=#{ API_KEY }&query=#{ params[:query] }"

    # Print the API request URL we just constructed to the server
    # console, so we can test it in the browser if we need to
    puts url

    response = HTTParty.get url
    # raise 'hell'

    @results = response['results']

  end # search


  def show
    # raise 'hell'
    url = "#{ BASE_URL }/movie/#{ params[:id] }?api_key=#{ API_KEY }"
    puts url
    @movie = HTTParty.get url
    p @movie
  end


end
