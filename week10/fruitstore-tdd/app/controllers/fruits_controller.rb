class FruitsController < ApplicationController
  def index
    # render plain: 'hello'
    @fruits = Fruit.all.reverse

    respond_to do |format|
      format.html  # render template, default behaviour
      format.json {  render json: @fruits  }
    end

  end

  def search
    puts "this has not been tested"
    puts "also this"
  end

  def show
  end

  def create
    fruit = Fruit.create fruit_params

    if fruit.persisted?
      redirect_to fruit
    else
      render :new   # allow the user to correct the form errors
    end

  end

  private
  def fruit_params
    params.require(:fruit).permit(:name, :shelf_id)
  end

end
