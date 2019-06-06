class User < ApplicationRecord

  has_many :mixtapes

  # ActiveRecord will expect your 'users' table to have
  # a column called 'password_digest' which will store
  # the encrypted version of the password for a user
  # (this requires the 'bcrypt' gem).
  # We will specify 'User.create password: "chicken"'
  # when we create a user, i.e. a 'password' column,
  # but it will save the encrypted version into
  # 'password_digest'
  has_secure_password  # mandatory to give a password!

end
