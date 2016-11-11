class FavoritesController < ApplicationController

  def create
    @favorite = Favorite.new(favorite_params)
    @favorite.user_id = current_user.id

    if @favorite.save
      respond_to do |format|
        format.json { render json: @favorite }
      end
    else
      respond_to do |format|
        format.json {}
      end
    end

  end

  private

  def favorite_params
    params.require(:favorite).permit(:list_id)
  end
end
