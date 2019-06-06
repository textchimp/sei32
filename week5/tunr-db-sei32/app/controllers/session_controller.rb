class SessionController < ApplicationController
  def new
  end

  def create

    # See if the email address entered actually exists in the users table
    user = User.find_by email: params[:email]

    # Is the email address valid, and is the password the right one for this address?
    if user.present? && user.authenticate( params[:password] )
      # Successful login:
      # Get Rails to create a new session key to store the user's ID;
      # this is the key we will use to check if the user is still logged in, for
      # all future page requests.
      # i.e. this session data is remembered across page requests
      # (this is done by setting browser cookies)
      session[:user_id] = user.id
      redirect_to user_path(user.id)  # redirect to user show page (profile)
    else
      # Failed login (wrong credentials):

      # Show error message
      # To do this, we use the special 'flash' hash - this creates a key-value
      # pair which exists for ONLY the NEXT PAGE LOAD
      flash[:error] = "Invalid email address or password"

      redirect_to login_path
    end

  end


  def destroy
    session[:user_id] = nil   # This logs out the user (deletes the session user ID)
    redirect_to login_path
  end

end
