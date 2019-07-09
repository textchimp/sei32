module Types
  class PlaneType < Types::BaseObject
    field :id, ID, null: true
    field :name, String, null: true
    field :rows, Integer, null: true
    field :cols, Integer, null: true
  end
end
