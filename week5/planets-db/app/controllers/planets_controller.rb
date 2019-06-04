
class PlanetsController < ApplicationController

  # Let us write our own crappy forms without
  # any security.... just for today
  skip_before_action :verify_authenticity_token, raise: false

  # Create actions

  # 1. Blank form
  def new
  end

  # 2. Form submit action
  def create

    Planet.create(
      name: params[:name],
      image: params[:image],
      orbit: params[:orbit],
      diameter: params[:diameter],
      mass: params[:mass],
      temperature: params[:temperature],
      moons: params[:moons]
    )

    # The CRUD create action has no template
    # of its own - instead we redirect to the
    # index
    redirect_to( planets_path )  # '/planets'

  end


  # Read actions

  # 1. Index page
  def index
    # Get all the rows in the 'planets' table (as an array of Planet objects)
    @planets = Planet.all
  end

  # 2. Show page (for a specific planet, when
  # we know its ID)
  def show
    @planet = Planet.find params[:id]
  end

  # Update actions

  # 1. Prepopulated form
  def edit
    @planet = Planet.find params[:id]
  end

  # 2. Edit form submit action
  def update
    planet = Planet.find params[:id]
    planet.update(
      name: params[:name],
      image: params[:image],
      orbit: params[:orbit],
      diameter: params[:diameter],
      mass: params[:mass],
      temperature: params[:temperature],
      moons: params[:moons]
    )

    # No template for this update action,
    # redirect to the show page for the
    # planet we just updated.
    redirect_to( planet_path(planet.id) )
  end

  # Delete action
  def destroy
    Planet.destroy params[:id]

    # Redirect to index page
    redirect_to( planets_path )
  end


end
