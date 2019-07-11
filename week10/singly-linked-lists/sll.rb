
class SinglyLinkedList

  attr_accessor :head

  # If we define the general-purpose 'each' method for our list, we can make
  # use of dozen of other methods which all ultimately do their work via each,
  # passing in particular blocks
  # This is an example of "interface abstraction"
  include Enumerable   # this is a 'mixin', kind of like multiple inheritance


  def initialize( value=nil )
    # Create a new instance of the Node class, pass
    # the value down to it, and set the new node
    # object it returns as the head of the list
    @head = Node.new( value ) if value
  end

  # Return the last node in the list
  def last
    node = @head
    while node && node.next
      node = node.next
    end
    node
  end

  # Add a node to the end of the list
  def append( value )
    # new_node = Node.new value
    last.next = Node.new value
  end

  # Add a node to the start of the list
  def prepend( value )
    new_node = Node.new value

    # Whatever was at the start of the list, is now the 'next'
    # node for the new node we just created
    new_node.next = @head

    # The new head of the list is set to be the new node
    # that we just created
    @head = new_node
  end

  # HOMEWORK: implement the following methods:

  # Return the node at the specified index, like array[n]
  def at_index( n )

    # node = @head
    #
    # index = 0
    # while node
    #   return node if index == n
    #   node = node.next   # i++
    #   index += 1
    # end
    # nil   # we only get here if index never equals n, i.e. we never return from inside the loop

    each { |node, index|  return node if index == n  }

    # n.times do
    #   # node = node.next if node
    #   if node
    #     node = node.next
    #   else
    #     break  # stop the n.times loop from looping n times, if we're at the end of the list
    #   end
    # end

    node
  end

  alias_method :[], :at_index  # use square bracket array-style notation as an alias for at_index

  # Insert a new node with the given value into the list,
  # after the specified node (i.e. the node is already in
  # the list)
  def insert_after( node, value )
    new_node = Node.new value
    new_node.next = node.next
    node.next = new_node
  end

  # Remove the specified node from the list
  def remove( node )

    # special case: remove the first node
    if node == @head
      return @head = @head.next
    end
    # return @head = @head.next if node == @head

    current = @head
    last = nil
    while current
      break if current == node
      last = current
      current = current.next
    end

    last.next = current.next  # skip the current node, i.e. remove from chain
  end

  # Returns the length of the list
  def length
    # TODO: make into an instance variable, and only change when you insert/remove
    # from the list, i.e. no need to iterate through entire list to find length
    i = 0
    # node = @head
    # while node
    #   i += 1
    #   node = node.next
    # end
    each { |node|  i += 1 }
    i
  end

  # Returns the (first) node object whose value is equal to
  # the argument
  def find( value )
    # node = @head
    # while node
    #   return node if node.value == value
    #   node = node.next
    # end
    each { |node|  return node if node.value == value  }
  end

  # Reverses the order of the list (non-destructive)
  def reverse
    reversed = SinglyLinkedList.new  # no value for new list, i.e. do not create a first node
    # node = @head
    # while node
    #   reversed.prepend node.value
    #   node = node.next
    # end
    each { |node|  reversed.prepend node.value  }

    reversed
  end

  def reverse!  # destructive (changes the original list)
    @head = self.reverse.head
  end

  # Executes the given block, passing in the current node
  # as a block variable, for each node in the list
  # Google it! RTFM!
  # Hint: it involves 'yield'
  def each

    return nil unless block_given?

    node = @head
    index = 0
    while node
      yield node, index  # run the block, passing these arguments as block variables
      node = node.next
      index += 1
    end

  end

  # l.each do |node|
  #   puts node.value
  # end


  # Bonuses: map, inject (reduce)...
  # Write a Rspec test suite for these methods





  # Write our own version of the to_s method, which
  # Ruby will try to call automatically when we print
  # a list object using 'puts'
  def to_s
    # Loop through each node in our list, starting at @head,
    # and add the 'value' of each node we visit to an output
    # string; then follow the 'next' pointer to get the
    # next node in the list for the next loop iteration...
    # until we find a node whose 'next' value is nil
    output = ''

    # node = @head
    #
    # while node  # i.e until the current node is nil
    #   output += node.value + ', '
    #   node = node.next  # i++, i.e. increment the counter / move to the next node
    # end

    each { |node|  output += node.value + ', '  }

    output
  end



  # The Node class is only for internal
  # use by SinglyLinkedList
  class Node
    attr_accessor :value, :next  # getters and setters for both instance variables

    def initialize( value )
      @value = value
      @next = nil
    end

  end  # class Node

end

l = SinglyLinkedList.new 'Groucho'
l.prepend 'Chico'
l.prepend 'Harpo'


require 'pry'
binding.pry
