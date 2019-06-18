Rails.application.routes.draw do

  get '/dashboard' => 'dashboard#app'  # our main SPA interface

  get '/uptime' => 'dashboard#uptime'

  get '/cpuhog' => 'dashboard#cpu_hog'

  get '/dogs' => 'dashboard#dogs_index'

end
