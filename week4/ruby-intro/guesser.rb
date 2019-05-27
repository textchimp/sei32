# Title: Guess The Number
# Activity:
# You are to generate a basic "guess my number" game. The computer will pick a random number between 0 and 10. The user will guess the number until they guess correctly.
# Specification:
# The user should be asked to guess a number
# If the user's guess is correct, the user should see a congratulatory message
# If the user's guess is not correct, the user should be asked to guess the number again.
# Extensions:
# Let the user choose the maximum value (so they can play a long game with a random value between 0 and 10000, for example).
# Give feedback to the user: "Wrong, guess higher!" or "Wrong, guess lower!"

require 'colorize'  # This is how we use someone else's package in our code
                    # (in this case we get the .red .green etc methods to use on strings)

print "Enter the maximum number: "
MAX_VALUE = gets.to_i

secret_number = Random.rand(0..MAX_VALUE)  # includes 0 and 10 as possible results

guess = -1  # this guarantees our loop will run at least once

until guess == secret_number

  # Drop us into a pry session, with the code paused at this line:
  # require 'pry'; binding.pry
  # use 'step' and 'next' to run each following line of code, one at a time...

  print "Please enter your guess (0-#{ MAX_VALUE }): "
  guess = gets.to_i

  # if guess != secret_number
  #   puts "Wrong! Guess again..."
  # end

  if guess > secret_number
    puts "Guess lower!".red
  elsif guess < secret_number
    puts "Guess higher!".yellow
  end

end # while

puts "Congratulations, you guessed it!".green
