# Drinking Age
# Ask the user for their age.
# Remember that anytime you get input, it is a string, so you will need to change the age input to a number.
# If age is less than 18, print an appropriate message.
# If the age is equal to or over 18, print a different message.

puts "Enter your age:"
age = gets.chomp.to_i

if age < 18
  puts "Scram, kiddo! Go drink some cordial."
else
  puts "Come on in and enjoy a life of alcholism!"
end
