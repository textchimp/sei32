# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Song.destroy_all

s1 = Song.create title: 'Achy Breaky Heart'
s2 = Song.create title: 'Have a Safe Trip, Dear'
s3 = Song.create title: 'Burn the Witch'
s4 = Song.create title: 'Identikit'

puts "Created #{ Song.all.length } songs."


Artist.destroy_all

a1 = Artist.create name: 'Billy Ray Cyrus'
a2 = Artist.create name: 'June of 44'
a3 = Artist.create name: 'Radiohead'

puts "Created #{ Artist.all.length } artists."

# Song -> Artist associations

s1.update artist_id: a1.id

# ActiveRecord magic! Re-use the '<<' Ruby array push operator to let us add
# songs to an artist's list of song associations - this actually saves the
# artist's ID as the 'artist_id' value for this song's row in the 'songs' table.

a1.songs << s1   # 'Achy Breaky Heart' is a song by 'Billy Ray Cyrus'

a2.songs << s2   # 'Have a Safe Trip, Dear' is a song by 'June of 44'

a3.songs << s3 << s4   # 'Burn the Witch' and 'Identikit' are by 'Radiohead'
# a3.songs << s4

puts "Songs by '#{ Artist.last.name }': #{ Artist.last.songs.pluck(:title).join(', ') }"


Album.destroy_all

al1 = Album.create title: 'Some Gave All', year: '1992'
al2 = Album.create title: 'Engine Takes to the Water', year: '1998'
al3 = Album.create title: 'A Moon-Shaped Pool', year: '2015'

puts "Created #{ Album.all.length } albums."

# Song -> Album associations
al1.songs << s1   # 'Achy Breaky Heart' is on the album 'Some Gave All' 🇺🇸
al2.songs << s2   # 'Have a Safe Trip, Dear' is on the album 'Engine Takes to the Water'
al3.songs << s3 << s4
# al4.songs << s1

puts "Songs on '#{ Album.last.title }': #{ Album.last.songs.pluck(:title).join(', ') }"


Genre.destroy_all

g1 = Genre.create name: 'Nautical Rock'
g2 = Genre.create name: 'Math Rock'
g3 = Genre.create name: 'Paranoid Art-Rock'
g4 = Genre.create name: 'Country'
g5 = Genre.create name: 'Sadcore'
g6 = Genre.create name: 'IDM'

puts "Created #{ Genre.all.length } genres."


# Many-to-many associations between Song and Genre
s1.genres << g4
s2.genres << g1 << g2
s3.genres << g3 << g5
s4.genres << g3 << g5 << g6


Mixtape.destroy_all

m1 = Mixtape.create name: 'Driving Songs'
m2 = Mixtape.create name: 'Make-out Music'
m3 = Mixtape.create name: 'Code Jams'

puts "Created #{ Mixtape.all.length } mixtapes."

# Many-to-many relationships between Mixtape and Song
m1.songs << s1 << s2 << s3 << s4   #  'This mixtape features these four songs'
m2.songs << s1 << s4
m3.songs << s2 << s3

# Alternately:
# s1.mixtapes << m1 << m3  #  'This song appears on these two mixtapes'

User.destroy_all

u1 = User.create name: 'Luke', email: 'luke@ga.co', password: 'chicken'
u2 = User.create name: 'Mikaela', email: 'mikki@ga.co', password: 'chicken'
u3 = User.create name: 'Nookie', email: 'nooknook@ga.co', password: 'chicken'

puts "Created #{ User.all.length } users."

# User -> Mixtape associations (a user has many mixtapes)
u1.mixtapes << m1 << m3
u2.mixtapes << m2
