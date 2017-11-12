class TagsController < ApplicationController
  skip_filter :authenticate_user!, only: [:index]

  def index
    response = Tag.format_json 
    
    respond_to do |format|
      format.json { render json: response }
    end
  end
  
end
