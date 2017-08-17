class UsersController < ApplicationController
  skip_filter :authenticate_user!, only: [:index, :show]

  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.json { render json: @user.format_json }
      
    end
  end

  def index
    @users = User.all

    respond_to do |format|
      format.json { render json: @users }
    end
  end
end
