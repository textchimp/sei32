
require 'sinatra'  # like JS <script src=""> tags... use someone else's code
require 'sinatra/reloader'

# Define some routes that this webserver will respond to

get "/" do
  # This is the block which responds to a URL request for "http://localhost/"
  # (which is the same as "http://localhost") - the 'root' or top-level route
  # of the server

  # This block must eventually respond with a string which will be the
  # response sent back to the browser

  "Hello World from this fantastic site!"
end


get "/luckynumber" do
  number = Random.rand 1..200
  puts "\n\nThe number was #{ number }\n\n"
  "Here is your lucky number: #{ number }"
end


# get "/hello/josh" do
#   "Hello Josh! Thanks for visiting my site."
# end
#
# get "/hello/amanda" do
#   "Hello Amanda! Thanks for visiting my site."
# end

# This route handler will respond to any URL that starts with "/hello/SOMETHING"
get "/hello/:name" do
  # We use the symbol which was the placeholder in the URL above as the key
  # into the 'params' hash - the value will be the string that actually appeared
  # at that position in the actual URL

  # For the request: '/hello/david' to this handler, Sinatra does this:
  # params[:name] = 'david'

  # puts params

  "Hello #{ params[:name] }! Thanks for visiting my site."
end

# matches:
# /hello/first/last
# /hello/2/3
# /hello/cats/dogs
# etc...

# does NOT match:
# /hello/first       (no following / and following word)
# /hello/first/      (no following word)
# /hello/first/last/ (there is an extra slash)
get "/hello/:first_name/:last_name" do
  "Hello #{ params[:first_name] } #{ params[:last_name] }! Thanks for visiting my site."
end

# Calculator!
get "/calc/:operation/:x/:y" do
  puts '='*60   # gives us a string with 60 '=' characters concatenated
  puts params
  puts '='*60

  # do calculation, show result in string at the end
  # result = params[:x].to_i + params[:y].to_i

  @x = params[:x].to_i
  @y = params[:y].to_i
  @op = params[:operation]

  # if params[:operation] == '*'
  #   result = params[:x].to_i * params[:y].to_i
  # elsif....

  # case op
  # when '+' then result = x + y
  # when '-' then result = x - y
  # when '*' then result = x * y
  # when '/' then result = x * y
  # when 'div' then result = x / y
  # end

  # result = case op
  # when '+' then x + y
  # when '-' then x - y
  # when '*' then x * y
  # when '/' then x * y
  # when 'div' then x / y
  # end


  @result = @x.send(@op, @y) # 'send a message' (call a method) on an object

  # "The result of #{ x } #{ op } #{ y } is #{ result }"

  # Return the contents of the file
  # views/calc_result.erb as the response
  # for this route
  erb :calc_result

end


# show blank form
get "/calc/form" do
  erb :calc_form
end

# form submits to this route
get "/calc/results" do
  puts
  puts params
  puts

  @x = params[:x].to_i
  @y = params[:y].to_i
  @op = params[:operator]

  @result = @x.send(@op, @y)

  erb :calc_result
end
