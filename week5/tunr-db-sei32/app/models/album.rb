class Album < ApplicationRecord
  has_many :songs

  # Through association: an album has many artists,
  # but not directly (there is not artist_id on the
  # albums table), but VIA its songs (each song
  # has an artist_id)
  has_many :artists, through: 'songs'

  # Write our own method, like a 'virtual column'
  # that each album object can use
  def artist
    self.artists.uniq.first
  end


end
