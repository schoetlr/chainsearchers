class ListsController < ApplicationController

  def create
    @list = List.new(list_params)

    if @list.save
      respond_to do |format|
        format.json { render json: @list.to_tree }
      end
    else
      respond_to do |format|
        format.json {}
      end
    end
  end


  private

  def list_params
    params.require(:list).permit(:title, :description)
  end
end
