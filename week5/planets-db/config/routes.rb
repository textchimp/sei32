Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Planets CRUD system

  # Create routes
  get "/planets/new" => "planets#new"
  post "/planets" => "planets#create"

  # Read routes
  get "/planets" => "planets#index"
  get "/planets/:id" => "planets#show", as: 'planet'  # gives us planet_path(id) helper

  # Update routes
  get "/planets/:id/edit" => "planets#edit", as: 'planet_edit'  # gives us planet_edit_path(id)
  post "/planets/:id" => "planets#update"

  # Delete route
  get "/planets/:id/destroy" => "planets#destroy", as: 'planet_destroy'

end
