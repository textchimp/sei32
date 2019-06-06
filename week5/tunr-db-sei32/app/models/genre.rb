class Genre < ApplicationRecord

  # This is one side of a many-to-many association;
  # it tells ActiveRecord to use the 'genres_songs'
  # table to find the songs for this genre.
  has_and_belongs_to_many :songs

  has_many :artists, through: 'songs'

end
