class VotesController < ApplicationController
  before_action :validate_not_voted, only: [:create]

  def create
    @vote = Vote.new(vote_params)
    @vote.user_id = current_user.id

    # list_voted = List.find(@vote.list_id)
    
    # if params[:downvote] && list_voted.vote_count == 1
    #   list_voted.vote_count -= 2
    # elsif params[:downvote]
    #   list_voted.vote_count -= 1
    # else
    #   list_voted += 1
    # end
    


    if @vote.save #&& list_voted.save
      respond_to do |format|
        format.json { render json: @vote }
      end
    else
      respond_to do |format|
        format.json {  }
      end
    end

  end

  def update
    @vote = Vote.find(params[:id])

    if @vote.update(vote_params)
      respond_to do |format|
        format.json { render json: @vote }
      end
    else
      respond_to do |format|
        format.json {}
      end
    end
  end


  private

  def validate_not_voted
    @list = List.find(params[:vote][:list_id])

    user_votes = @list.votes.select { |vote| vote.user_id == current_user.id }
    unless user_votes.length == 0
      redirect_to :back
    end
  end


  def vote_params
    params.require(:vote).permit(:list_id, :downvote)
  end
end
