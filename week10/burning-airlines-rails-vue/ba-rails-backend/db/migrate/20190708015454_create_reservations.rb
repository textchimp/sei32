class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.integer :row
      t.integer :col
      t.integer :flight_id
      t.integer :user_id
      t.datetime :paid

      t.timestamps
    end
  end
end
