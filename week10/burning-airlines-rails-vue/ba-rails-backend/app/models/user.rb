class User < ApplicationRecord
  has_many :reservations
  # flights through reservations?
  has_secure_password
end
