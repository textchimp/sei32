
require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'sqlite3'
require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',      # what is the DB system we are using?
  database: 'database.db'  # where are the database contents?
)

# Log out all the SQL queries constructed by ActiveRecord
# .... so much SQL that we don't have to write ourselves
ActiveRecord::Base.logger = Logger.new( STDERR )

after do
  # This code will run after any specific route block runs
  # - this is a Sinatra feature which makes our route blocks DRYer
  ActiveRecord::Base.connection.close
end

# This is the capitalised singular version of our table name 'animals'
# We will now be able to do queries on our animals table using this class
class Animal < ActiveRecord::Base
  has_many :spotters # this requires the animal_id field in the 'spotters' table
end

# This is our model of the 'spotters' table
class Spotter < ActiveRecord::Base
  belongs_to :animal  # this requires the animal_id field in the 'spotters' table
end

# Test the ActiveRecord code in pry without using the webserver
# NOTE: you need to remove this line for the webserver to work as normal!
# binding.pry


# def db_query( sql )
#   db = SQLite3::Database.new( "database.db" )  # connect to database
#   db.results_as_hash = true
#   puts "======================================================"
#   puts sql
#   puts "======================================================"
#   result = db.execute( sql )
#   db.close  # close the connection
#   result  # this is what this method returns
# end

get "/animals" do
  # READ - index: show a list of all animals in the table

  # @result = db_query( "SELECT * FROM animals;" )
  @result = Animal.all

  erb :animals_index
end


get "/animals/new" do
  # CREATE part 1: The blank for for creating a new animal
  # The form submits to the route below due to the <form action="/animals" method="post"> tag
  erb :animals_new
end

post "/animals" do
  # CREATE part 2: The form from the route above submits to here
  # Construct a monster SQHell query to create a new animal using the data from the form (which is in params)

  # sql = "INSERT INTO animals( first_name, last_name, description, species, roundness, alive, age, image_url )
  #          VALUES(
  #            '#{ params[:first_name] }',
  #            '#{ params[:last_name]  }',
  #            '#{ params[:species]    }',
  #            '#{ params[:description]}',
  #            '#{ params[:roundness]  }',
  #            '#{ params[:alive]      }',
  #            '#{ params[:age]        }',
  #            '#{ params[:image_url]  }'
  #          );"
  # ^ NOTE: we can actually put quotes around the integer values too, and Sqlite will convert them
  # to integer values for us; putting qoutes around them will prevent our SQL query from breaking
  # if the form field is left blank (`age = '',` is valid SQL, but `age = ,` is not)
  # db_query( sql )      # Run the query to insert the new animal, and ignore any return value

    Animal.create(
      first_name:  params[:first_name] ,
      last_name:   params[:last_name]  ,
      species:     params[:species]    ,
      description: params[:description],
      roundness:   params[:roundness]  ,
      alive:       params[:alive]      ,
      age:         params[:age]        ,
      image_url:   params[:image_url]
    )

  redirect "/animals"  # This submit route does not have its own template, it redirects to the index instead
end


get "/animals/:id/edit" do
  # UPDATE part 1: get the item's data from the database, and use it to prefill the edit form
  # This form submits to the route below, due to its <form action="/animals/<%= @animal['id'] %>" method="post"> tag

  # @animal = db_query( "SELECT * FROM animals WHERE id = #{ params[:id] };" )
  # @animal = @animal.first # pull out just the first result from the result array
  @animal = Animal.find( params[:id] )

  erb :animals_edit
end

post "/animals/:id" do
  # UPDATE part 2: handle the form submission: plug in the form values
  # to an SQL UPDATE query, to update this item... and then redirect to the show page

  # sql = "UPDATE animals SET
  #   first_name  = '#{ params[:first_name] }',
  #   last_name   = '#{ params[:last_name]  }',
  #   species     = '#{ params[:species]    }',
  #   description = '#{ params[:description]}',
  #   roundness   = '#{ params[:roundness]  }',
  #   alive       = '#{ params[:alive]      }',
  #   age         = '#{ params[:age]        }',
  #   image_url   = '#{ params[:image_url]  }'
  #   WHERE id = #{ params[:id] };"
  # db_query( sql )  # execute UPDATE query and ignore result

  animal = Animal.find( params[:id] )
  animal.update(
    first_name:  params[:first_name] ,
    last_name:   params[:last_name]  ,
    species:     params[:species]    ,
    description: params[:description],
    roundness:   params[:roundness]  ,
    alive:       params[:alive]      ,
    age:         params[:age]        ,
    image_url:   params[:image_url]
  )

  redirect "/animals/#{ params[:id] }"   # redirect to show page for this item
end


get "/animals/:id/delete" do
  # DELETE: delete the item (table row) by its ID, and redirect to the index

  # sql = "DELETE FROM animals WHERE id = #{ params[:id] };"
  # db_query( sql )  # execute DELETE query and ignore result

  animal = Animal.find( params[:id] )
  animal.destroy

  redirect "/animals"  # redirect to index
end


# This route will catch /animals/ANYTHING , including a path like
# /animals/new  ... so we have to put more specific routes like
# /animals/new BEFORE this more general route
get "/animals/:id" do
  # READ - show: displays the details for a single item (row)

  # @animal = db_query( "SELECT * FROM animals WHERE id = #{ params[:id] };" )
  # @animal = @animal.first # pull out just the first result from the result array
  @animal = Animal.find( params[:id] )

  erb :animals_show
end


##############################################################
# CRUD routes for spotters table

# CREATE 1: blank form
get "/spotters/new" do
  erb :spotters_new
end

# CREATE 2: form submits to here, redirects to index
post "/spotters" do

  Spotter.create(
    name:      params[:name],
    location:  params[:location],
    animal_id: params[:animal_id]
  )

  redirect "/spotters"  # This submit route does not have its own template, it redirects to the index instead
end

# READ: index
get "/spotters" do
  @spotters = Spotter.all  # get every row in the 'spotters' table (as an array of Spotter objects)
  erb :spotters_index
end

# READ: show
get "/spotters/:id" do
  @spotter = Spotter.find params[:id]
  erb :spotters_show
end

# UPDATE 1: show update form with values pre-populated
get "/spotters/:id/edit" do
  @spotter = Spotter.find params[:id]
  erb :spotters_edit
end

# UPDATE 2: edit form submits to here, redirects to show page
post "/spotters/:id" do

  spotter = Spotter.find( params[:id] )
  spotter.update(
    name:      params[:name],
    location:  params[:location],
    animal_id: params[:animal_id]
  )

  redirect "/spotters/#{ params[:id] }"   # redirect to show page for this item
end

# DELETE: remove item from DB and redirect to index
get "/spotters/:id/delete" do
  spotter = Spotter.find params[:id]
  spotter.destroy

  redirect "/spotters"  # redirect to index
end
