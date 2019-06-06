class ApplicationController < ActionController::Base

  before_action :fetch_user  # Run this method before every action of every controller

  def fetch_user
    # Check if session[:user_id] is set, and also make sure the ID it contains
    # is a valid user ID - if so, set an instance variable containing the user
    # object. By setting that variable here, it will be available to any
    # action inside any controller.

    if session[:user_id].present?
      @current_user = User.find_by id: session[:user_id]
    end

    # Clear (delete) the login session unless the user ID it contains is actually
    # a valid user ID
    session[:user_id] = nil unless @current_user.present?

    # if @current_user.nil?
    #   session[:user_id] = nil
    # end

  end

end
