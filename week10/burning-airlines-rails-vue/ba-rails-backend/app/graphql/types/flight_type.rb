module Types
  class FlightType < Types::BaseObject
    field :id, ID, null: false
    field :flight_number, String, null: false
    field :departure_date, String, null: false
    field :origin, String, null: false
    field :destination, String, null: false
    field :plane, PlaneType, null: false  # association
    field :reservations, [ReservationType], null: true # association

    # field :reservations_lookup, Hash??
    # def reservations_lookup
    #   object.reservations.each
    # end

    # computed field
    field :journey, String, null: false
    def journey
      # object refers to the Flight model instance
      "#{object.origin} to #{object.destination}"
    end

  end
end
