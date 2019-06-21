
arr = [ 1, 2, 3, 4, 5, 6 ]  # (1..6).to_a

# arr.each do |elem|
#   puts elem
# end

def recursive_each( array, indent=0 )

  # 1. REMOVE the first item from the array, and print it
  # first = array.shift

  # first = array.first
  # rest = array[ 1..-1 ]

  first, *rest = array   # array 'unpacking'/'destructuring' syntax

  # puts first

  spaces = "    " * indent

  puts "#{spaces} starting recursive_each( #{array} )"
  puts "#{spaces} first: #{first}"
  puts "#{spaces} rest: #{rest}"

  # Base case test
  if rest.any?   # rest.length > 0
    recursive_each( rest, indent + 1 )
  end

  puts "#{spaces} returning from recursive_each( #{array} )"

end

recursive_each( arr )
