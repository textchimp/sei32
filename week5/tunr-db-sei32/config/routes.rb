Rails.application.routes.draw do

  # All CRUD routes for the User model, except an index page
  resources :users, except: [ :index ]

  # Session (login-logout) routes
  get '/login' => 'session#new'        # login form
  post '/login' => 'session#create'    # form submits here to perform login (create session)
  delete '/login' => 'session#destroy' # logout (delete session)


end
