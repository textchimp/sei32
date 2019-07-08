class Flight < ApplicationRecord
  belongs_to :plane, optional: true
  has_many :reservations

  def departure_date_formatted
    departure_date.strftime("%d %b %Y, %l:%M%P")
  end

end
