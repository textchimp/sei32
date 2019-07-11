Rails.application.routes.draw do

  resources :dogs
  # get '/fruits' => 'fruits#index'
  # post '/fruits' => 'fruits#create'

  resources :fruits, only: [:index, :create, :show]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
