
$calls = 0

$memo = {}  # Memoization

# def fib_r(n, a=1, b=1)

def fib_r( n )

  $calls += 1

  puts "fib_r( #{n} )"

  # Define the base case (no more recursion)
  if n < 2
    puts "return: fib_r( #{n} ) = 1"
    return 1
  else
    # Recursive case

    if $memo.has_key?(n - 1)
      first = $memo[n-1]
    else
      first = fib_r( n - 1 )
    end

    if $memo.has_key?(n - 2)
      second = $memo[n-2]
    else
      second = fib_r( n - 2 )
    end


    puts "return: fib_r(#{ n - 1 }) = #{first}, fib_r(#{ n - 2 }) = #{second}"

    $memo[ n ] = first + second

    return first + second
  end

end

# prints out the first 10 Fibonacci numbers:
# 1, 1, 2, 3, 5, 8, 13, 21, 34, 55

num = ARGV[0].to_i

puts "fib_r(#{ num }): #{ fib_r( num ) }"

puts "total calls: #{ $calls }"
p $memo

#
# def fib( n )
#
# end
