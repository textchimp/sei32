module Types
  class ReservationType < Types::BaseObject
    field :id, ID, null: true
    field :row, Integer, null: true
    field :col, Integer, null: true
    field :flight, Types::FlightType, null: true # association
    field :paid, String, null: true
  end
end
