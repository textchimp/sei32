module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :favourite_number, Integer, null: false,
      description: 'My favourite number in the world'
    def favourite_number
      rand(1..100)
    end

    field :flight, FlightType, null: false do
      description 'A single flight'
      argument :id, ID, required: true
    end
    def flight( id: )
      Flight.find( id )
    end

    field :flights, [Types::FlightType], null: false,
      description: 'A list of flights'
    def flights
      Flight.all
    end

    field :reservations, [Types::ReservationType], null: false, description: 'A list of reservations'
    def reservations
      Reservation.all
    end

  end
end
