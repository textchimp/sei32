class CreatePlanets < ActiveRecord::Migration[5.2]

  def change
    create_table :planets do |t|

      # Rails automatically gives us an integer :id field
      # which will be the primary key for the table...
      # it's not optional!

      t.string :name    # a string column for the planet's name
      t.text  :image    # a longer text column for the image URL
      t.float :orbit    # a float for for the orbit time of the planet
      t.float :diameter
      t.float :mass
      t.float :temperature
      t.integer :moons

      # The above replaces an SQL stamtent like
      # CREATE TABLE planets( name TEXT, .... )
      # and because it's Ruby code, it's abstracted away from any
      # specific database format, and can be converted to any
      # of them.

    end
  end

end
