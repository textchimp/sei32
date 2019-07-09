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

    # Create lookup tables (hashes) of reservations, one for the current user,
    # and one for other users, to make it easy to check in the frontend if a
    # seat is booked
    fake_current_user_id = 1
    reservations_lookup = {}
    user_reservations_lookup = {}

    flight.reservations.each do |res|
      if res.user_id == fake_current_user_id
        user_reservations_lookup[ "#{res.row}:#{res.col}" ] = 1
      else
        reservations_lookup[ "#{res.row}:#{res.col}" ] = 1
      end
    end

    # p 'user_reservations_lookup', user_reservations_lookup
    # p 'reservations_lookup', reservations_lookup

    render json: {
      flight: flight,
      user_reservations: user_reservations_lookup,
      reservations: reservations_lookup
    }, include: [:plane] #, :reservations]


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

  def make_reservation

    reservation = Reservation.create(
      row: params[:row],
      col: params[:col],
      flight_id: params[:flight_id],   # TODO: should check these are valid!
      user_id: params[:user_id]
    )

    if reservation.persisted?
      render json: {
        reservation: reservation,
        success: true
      }
    else
      render json: {
        errors: reservation.errors.full_messages
      }
    end

  end


end
