
class StocksController < ApplicationController

  def form
  end

  def lookup
    @stock_result = StockQuote::Stock.quote( params[:symbol] )
    # raise 'hell'
  end

end
