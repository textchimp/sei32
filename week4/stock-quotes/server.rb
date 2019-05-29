require 'sinatra'
require 'sinatra/reloader'
require 'stock_quote'


# blank form
get "/lookup/form" do
  erb :form
end

# form submits here
get "/lookup/results" do

  # get stock name from params,
  # and use with stock_quote lookup method

  # save the latest_price into an instance variable so you can show it in the result template

  stock = StockQuote::Stock.quote( params[:code] )
  @price = stock.latest_price
  @company = stock.company_name

  erb :results
end
