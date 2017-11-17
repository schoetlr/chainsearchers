class TagsController < ApplicationController
  skip_filter :authenticate_user!, only: [:index]
  skip_filter :verify_authenticity_token, only: [:index]
  before_action :set_headers

  
  def index
    response = Tag.format_json 
    
    respond_to do |format|
      format.json { render json: response }
    end
  end


  private

  def set_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end
  
end
