# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# This is like our add-animals.sql file, with lines like:
# INSERT INTO animals(columns....) VALUES(....);

puts "Populating the solar system..."

# Remove any existing rows from this table, so that running the seeds file always
# leaves us with a database in a totally predictable state
Planet.destroy_all

Planet.create name: 'Earth', orbit: 1, mass: 1, diameter: 1, temperature: 1, moons: 1, image: 'https://jointmission.gsfc.nasa.gov/images/VIIRS8Feb2012-30S145E.png'

Planet.create name: 'Mars', orbit: 687, mass: 0.2, diameter: 0.1, temperature: 0.2, moons: 3, image: 'https://space-facts.com/wp-content/uploads/mars.jpg'

Planet.create name: 'Venus', orbit: 0.5, mass: 0.5, diameter: 0.05, temperature: 10, moons: 2, image: 'https://cdn.mos.cms.futurecdn.net/pNX8eVGowB6WT8tyrTMufk-1200-80.jpg'

Planet.create name: 'Jupiter', orbit: 800, mass: 10_000, diameter: 500, temperature: 0.1, moons: 13, image: 'http://cdn.sci-news.com/images/enlarge4/image_5608_2e-Jupiter.jpg'

puts "Created #{ Planet.all.length } planets."
puts "Done."
