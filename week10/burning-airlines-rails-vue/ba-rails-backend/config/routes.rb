Rails.application.routes.draw do

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  get '/flights'     => 'flights#index'
  get '/flights/:id' => 'flights#show'
  # resources :flights, only: [:index, :show]

  get '/flights/:origin/:destination' => 'flights#search'

  post '/reservations' => 'flights#make_reservation'

end
