
require 'sinatra'
require 'sinatra/reloader'
require 'sqlite3'

# DRY up our routes by creating a reusable DB query function
def db_query( sql )
  db = SQLite3::Database.new 'database.db'
  db.results_as_hash = true
  puts '==============================='
  puts sql   # for debugging our SQL
  puts '==============================='
  result = db.execute sql
  db.close
  result  # return the result of the query
end

# CREATE routes:

# 1. Blank form (new)
get "/animals/new" do
  erb :new
end

# 2. New form submits here
post "/animals" do

  sql = "INSERT INTO animals( name, species, description, roundness, alive, age, image_url )
          VALUES(
            '#{ params[:name] }',
            '#{ params[:species] }',
            '#{ params[:description] }',
            '#{ params[:roundness] }',
            '#{ params[:alive] }',
            '#{ params[:age] }',
            '#{ params[:image_url] }'
          );"

  db_query sql

  # This form submit route does not have its own template - it redirects
  # to another route instead. In this case, the animals index
  redirect "/animals"
end


# READ routes:

# 1. Index of all animals
get "/animals" do
  @results = db_query 'SELECT * FROM animals;'
  erb :index
end

# 2. Show page, details for one animal
get "/animals/:id" do
  @animal = db_query "SELECT * FROM animals WHERE id = #{ params[:id] };"

  # We know there will only be one result, so pull it out of the array
  @animal = @animal.first

  erb :show
end

# UPDATE routes:

# 1. Prepopulated form for a specific animal by ID
get "/animals/:id/edit" do
  result = db_query "SELECT * FROM animals WHERE id = #{ params[:id] };"
  @animal = result.first
  erb :edit
end

# 2. Submit the edit form
post "/animals/:id" do
  p params


  sql = "UPDATE animals SET
            name        = '#{ params[:name] }',
            species     = '#{ params[:species] }',
            description = '#{ params[:description] }',
            roundness   = '#{ params[:roundness] }',
            alive       = '#{ params[:alive] }',
            age         = '#{ params[:age] }',
            image_url   = '#{ params[:image_url] }'
         WHERE id = #{ params[:id] };"

  db_query sql

  redirect "/animals/#{ params[:id] }"   # redirect to the show (details) page for this animal
end


# DELETE route
get "/animals/:id/delete" do
  db_query "DELETE FROM animals WHERE id = #{ params[:id] }"
  redirect "/animals"   # No template to show, redirect to the index
end
