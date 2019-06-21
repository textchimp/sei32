
def countdown( n=10 )

  while n >= 0
    puts n
    n -= 1
    sleep 0.3
  end

  puts 'Blast off!'

end

# countdown

# variables
# functions
# conditionals (if statements/branching)

def countdown_r( n )

  # Define a 'Base Case': a condition under which we STOP calling ourselves
  # recursively - otherwise you will have an infinte loop, recursive edition
  if n < 0
    puts 'Blast off!'
  else
    # Recursive case:
    # The function calls itself, BUT it does it in a way that always brings
    # us a step closer to the base case which stops the recursion
    puts n
    sleep 0.3
    countdown_r( n - 1 )
  end

  puts "Backing out of recursion: n = #{ n }"

end


countdown_r( 10 )
