class TagsController < ApplicationController
  skip_filter :authenticate_user!, only: [:index]

  def index
    @tags = Tag.all 

    respond_to do |format|
      format.json { render json: @tags }
    end
  end
  
end
