require 'pry'

class Person

  # Variables starting with '@@' are class variables; they are like
  # a kind of global variable which is visible to all objects which
  # are instances of the class
  # They are the only kind of variable you can initialise (set a
  # value for) directly in the class body, instead of inside a
  # method like initialize()
  @@people = 0

  # This will write the GETTER and SETTER boilerplate methods for @age and @name
  attr_accessor :age, :name

  # # GETTER: return the value of an internal instance variable (make it visible to "the outside world")
  # def name
  #   @name
  # end
  #
  # # SETTER: lets us do: p.name = "some name"
  # def name=( new_name )
  #   @name = new_name
  # end

  # Class method, as opposed to the standard instance methods
  # below - we call this method directly on the class name
  # itself, instead of creating a new object and then calling
  # the method on the object. For example:
  #   Person.describe_person    # call the class method
  # instead of:
  #   p = Person.new("Linna")   # create a new instance of Person
  #   p.describe_person   # WON'T WORK - not defined for objects
  #
  # Note that class methods are defined by starting with 'self.'
  def self.describe_person
    # Class methods do NOT have access to instance variables -
    # how could they? Class methods are not defined for instances
    puts "I am for making people #{ @name }"
    # Will print "I am for making people "
  end

  # The initialize method is run whenever we do Person.new()
  def initialize( name, age=20 )
    puts "Making a new Person object..."
    @name = name
    @age = age

    # each object can access the shared class variable
    @@people += 1
    puts "Total of #{ @@people } people created today."
  end

  def say_hello
    puts "Hi! I'm #{ @name }. I am #{ @age }."
  end

  def laugh
    puts "Hahahahaha! Nice one!"
  end

  def laugh_at( person )
    # This code will cause an error unless person is a kind
    # of object with a .name attribute (method) defined
    puts "Hahah! You are so funny, #{ person.name }"
  end

  def die
    puts "Ugggggh the light grows dim..."
  end

end

class Comedian < Person

  def tell_joke
    print "What's brown and sticky?"
    3.times do
      print "."
      sleep 0.4
    end
    puts " A stick."
  end

  def say_hello
    puts "Hi! Listen to my podcast."
  end

  def laugh
    # super()will call the laugh() method defined in the parent class,
    # AKA superclass, i.e. you can override a method defined in the
    # parent class in your child class, but still have access
    # to the version of the method in the parent class
    super()
    puts "Hahaha! I'm so funny!"
  end

end

class SerialKiller < Person

  def laugh
    puts "MUAAHAHAHAHAHA"
  end

  def taunt_police
    puts "You will never catch me!"
  end

  def kill( victim )
    # return "Immortal" unless victim.respond_to? :die
    victim.die()
    puts "u ded"
  end

end

binding.pry
puts "Done!"  # otherwise pry just exits and we can't test our classes
