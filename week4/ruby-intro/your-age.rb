
puts "What is your age?"
age = gets().chomp()   # this is actually a function which returns a value into our var 'age'

puts "You said you are #{ age } years old."

# Need to convert the age value given to us as a string by gets()
# into an integer, so we can do addition
puts "In ten years you will be #{ age.to_i + 10 } years old."
