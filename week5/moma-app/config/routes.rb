Rails.application.routes.draw do

  # Note to future self: use same path handlers as 'resources' will give you, when you manually set handler names with 'as:'

  root to: 'artists#home'

  # Create routes
  get '/artists/new' => 'artists#new'
  post '/artists' => 'artists#create'

  # Read routes
  get '/artists' => 'artists#index'
  get '/artists/:id' => 'artists#show', as: 'artist'

  # Update routes
  get '/artists/:id/edit' => 'artists#edit', as: 'artist_edit'
  patch '/artists/:id' => 'artists#update'

  # Delete route
  delete '/artists/:id' => 'artists#destroy', as: 'artist_delete'


  # CRUD routes for Work model
  resources :works

end
