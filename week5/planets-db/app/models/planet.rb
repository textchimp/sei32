
class Planet < ApplicationRecord
  # All the behaviour of this class is inherited from ApplicationRecord, and
  # ultimately from ActiveRecord


  # Now we can write code like 'Planet.all' to get every row in the planets table.
  # Rails will know to use the 'planets' table to do this, based on the class name.
end
