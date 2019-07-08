class FlightsController < ApplicationController

  def index
    # Render the list of all flight objects as JSON to the browser, as the response.
    # When you render JSON, Rails doesn't include any associations by default, so
    # you have to ask for them individually. This 'include' syntax can get quite
    # complicated, especially for nested associations, or for including/excluding
    # certain columns.
    render json: Flight.all, include: {
      # Include the entire plane association object
      plane: {},
      # Include the reservations association (an array of reservations)
      # and for each reservation, include its user association...
      # but only the specified fields for that user (no password!)
      reservations: {
        include: {
          user: {
            # except: :password_digest
            only: [:id, :name, :email]
          }
        }
      }
    }
  end

  def show
    flight = Flight.find params[:id]
    render json: flight, include: [:plane, :reservations]
    #  {
    #   plane: {},
    #   reservations: {}
    # }
  end

  def search
    results = Flight.where origin: params[:origin], destination: params[:destination]

    # sleep 3  # fake a slow network connection

    render json: results,
      include: :plane,
      methods: [:departure_date_formatted]

  end

end
