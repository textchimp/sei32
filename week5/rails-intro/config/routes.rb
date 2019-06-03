Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # What to do for the "/" or 'root' route
  root to: "pages#funny"

  # When a get request is made to the '/hello' path, handle it by
  # going to the pages_controller.rb file and running the say_hi() method (action)
  get "/hello" => "pages#say_hi"

  get "/hello/:name" => "pages#say_hi_to"

  get "/lol"  => "pages#funny"


  # Calculator routes
  get "/calc" => "calculator#home"

  get "/calc/:first/:op/:second" => "calculator#do_calc"

  get "/calc/submit" => "calculator#do_calc"

end
