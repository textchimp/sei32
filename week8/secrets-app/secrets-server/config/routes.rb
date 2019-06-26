Rails.application.routes.draw do

  get '/secrets' => 'secrets#index'

  post '/secrets' => 'secrets#create'

end
