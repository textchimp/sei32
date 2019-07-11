class Fruit < ApplicationRecord

  validates :name, presence: true

  belongs_to :shelf #, optional: true

  def squishy?
    false
  end

end
