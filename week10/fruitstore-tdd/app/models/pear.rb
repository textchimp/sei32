class Pear < Fruit

  validates :name, uniqueness: true

  def squishy?
    true
  end

end
