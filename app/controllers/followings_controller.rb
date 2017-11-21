class FollowingsController < ApplicationController
  before_action :validate_create, only: [:create]
  before_action :validate_destroy, only: [:destroy]

  def create
    @following = Following.create(following_params)

    if @following.save
      respond_to do |format|
        format.json { render json: @following }
      end
    else
      respond_to do |format|
        format.json { render json: {} }
      end
    end
  end

  def destroy
    @following = Following.find(params[:id])

    if @following.destroy
      respond_to do |format|
        format.json { render json: @following }
      end
    else 
      respond_to do |format|
        format.json {}
      end
    end

  end

  private

  def validate_destroy
    @following = Following.find(params[:id])
    unless @following.follower_id == current_user.id
      redirect_to :back
    end
  end

  def validate_create
    unless following_params[:follower_id] == current_user.id
      redirect_to :back
    end
  end

  def following_params
    params.require(:following).permit(:follower_id, :followed_id)
  end
end