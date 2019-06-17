
class Bank

  attr_reader :name, :accounts

  def initialize( name )
    @name = name
    @accounts = {}
  end


  def create_account( name, balance=0 )
    @accounts[ name ] = balance
  end


  def deposit( account_name, amount )
    @accounts[ account_name ] += amount
  end

  def withdraw( account_name, amount )
    return unless @accounts[ account_name ] >= amount
    @accounts[ account_name ] -= amount
    # if amount <= @accounts[ account_name ]
    #   @accounts[ account_name ] -= amount
    # end
  end

  def balance( account_name )
    @accounts[ account_name ]
  end

  # def accounts
  #   @accounts
  # end

  # def name
  #   @name
  # end

end
