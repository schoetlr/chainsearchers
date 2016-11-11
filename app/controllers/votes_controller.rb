class VotesController < ApplicationController

  def create
    @vote = Vote.new(vote_params)
    @vote.user_id = current_user.id
    
    if @vote.save
      respond_to do |format|
        format.json { render json: @vote }
      end
    else
      respond_to do |format|
        format.json {  }
      end
    end

  end


  private

  def vote_params
    params.require(:vote).permit(:list_id, :downvote)
  end
end
