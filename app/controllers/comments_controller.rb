class CommentsController < ApplicationController
  skip_filter :authenticate_user!, only: [:index]

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    
    if @comment.save
      respond_to do |format|
        format.json { render json: @comment }  
      end
    else
      respond_to do |format|
        format.json {}
      end 
    end     
  end

  def index
    @list = List.find(params[:list_id])

    @comments = @list.comments
    @comments = @comments.map { |comment| comment.to_node }

    respond_to do |format|
      format.json { render json: @comments }
    end

  end


  private

  def comment_params
    params.require(:comment).permit(:commentable_type, :commentable_id, :content)
  end
end
