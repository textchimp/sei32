
class PagesController < ApplicationController

  def say_hi
  end

  def say_hi_to
    @hello_recipient = params[:name]
  end

  def funny
  end

end
