class Song < ApplicationRecord
  belongs_to :artist, optional: true  # let us make a song without specifying the artist
  belongs_to :album, optional: true

  # This is one side of a many-to-many association;
  # this tells ActiveRecord to use the 'genres_songs'
  # table to find the genres for this song.
  has_and_belongs_to_many :genres

  has_and_belongs_to_many :mixtapes


  

end
