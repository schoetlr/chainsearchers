class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.json { render json: @user.format_json }
      
    end

  end
end
