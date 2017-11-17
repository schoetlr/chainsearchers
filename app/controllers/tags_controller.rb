class TagsController < ApplicationController
  skip_filter :authenticate_user!, only: [:index]
  skip_filter :verify_authenticity_token, only: [:index]
  def index
    response = Tag.format_json 
    
    respond_to do |format|
      format.json { render json: response }
    end
  end
  
end
