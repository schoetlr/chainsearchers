
class LinksController < ApplicationController
  before_action :validate_ownership, only: [:destroy]

  

  def destroy
    @link = Link.find(params[:id])

    if @link.destroy
      respond_to do |format|
        format.json { render json: @link }
        format.html {}
      end
    end
  end

  private
  #validates the user who made the link is the one destroying it
  def validate_ownership
    @link = Link.find(params[:id])
    list_id = @link.list.id
    owner = current_user.lists.pluck(:id).include?(list_id)

    unless owner
      redirect_to :back
    end
  end

  
end
