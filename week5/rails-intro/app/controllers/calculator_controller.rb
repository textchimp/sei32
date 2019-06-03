
class CalculatorController < ApplicationController

  def home
  end

  def do_calc

    @first = params[:first].to_f
    @op = params[:op]
    @second = params[:second].to_f

    # This works because in Ruby, writing
    # 1 + 2
    # is actually interpreted as
    # 1.+( 2 )
    # and that can be written as
    # 1.send('+', 2)
    @result = @first.send(@op, @second)

  end

end
