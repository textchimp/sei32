
class ArtistsController < ApplicationController

  # Create actions

  # 1. New blank form
  def new
    @artist = Artist.new
  end

  # 2. Form submit and redirect
  def create

    # Artist.create(
    #   name: params[:artist][:name],
    #   dob: params[:artist][:dob]
    # )  ...SO LONG SUCKER!

    # Use the security-filtered version of the form params ('strong params')
    Artist.create artist_params

    redirect_to( artists_path )  # redirect to index page
  end

  # Root route (for convenience)
  def home
  end

  # Read actions:

  # 1. Index
  def index
    @artists = Artist.all
  end

  # 2. Show
  def show
    @artist = Artist.find params[:id]
  end

  # Update actions

  # 1. Prepopulated form for this artist ID
  def edit
    @artist = Artist.find params[:id]
  end

  # 2. Form submit action for edit
  def update

    artist = Artist.find params[:id]
    artist.update artist_params

    redirect_to artist_path(artist.id)
  end


  # Delete action
  def destroy
    Artist.destroy params[:id]

    redirect_to artists_path  # back to index
  end


  private

  # This method ensures firstly that the 'artist' key is set in the params hash,
  # and then also makes sure that only the permitted form elements are passed
  # through to the .create or .update methods which will use params to easily
  # save the form contents to the database.
  # This technique is called "Strong Params" in Rails.
  def artist_params
    params.require(:artist).permit( :name, :nationality, :dob, :period, :roundness, :bio, :image )
  end

end
