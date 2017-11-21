class FollowingsController < ApplicationController

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

  def following_params
    params.require(:following).permit(:follower_id, :followed_id)
  end
end