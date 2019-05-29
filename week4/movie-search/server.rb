
require 'sinatra'
require 'sinatra/reloader'
require 'httparty'

# search form
get "/search" do
  erb :search_form
end

# search form submits here
get "/search/results" do

  API_KEY = '24d863d54c86392e6e1df55b9a328755'
  BASE_URL = 'https://api.themoviedb.org/3'
  URL = "#{ BASE_URL }/search/movie?api_key=#{ API_KEY }&query=#{ params[:search_query] }"

  response = HTTParty.get( URL )  # actually make the request to the API

  @results = response['results']  # this is the array of movie results

  erb :search_results
end
