Rails.application.routes.draw do

  get '/flights'     => 'flights#index'
  get '/flights/:id' => 'flights#show'
  # resources :flights, only: [:index, :show]

  get '/flights/:origin/:destination' => 'flights#search'

end
