class SecretsController < ApplicationController

  # Our create form will be in React, so we won't have access to the Rails
  # authenticity token, so turn off this security feature
  skip_before_action :verify_authenticity_token

  # Run the set_cors_headers method before any action's method
  # before_action :set_cors_headers

  def index
    # sleep 3  # simulate a slow connection
    render json: Secret.all.reverse
  end

  def create
    secret = Secret.create content: params[:secret_text]
    render json: { secret: secret, created: true }
  end

  private
  def set_cors_headers
    headers['Access-Control-Allow-Origin'] = '*'
  end

end
