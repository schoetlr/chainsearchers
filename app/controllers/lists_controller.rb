class ListsController < ApplicationController

  def create
    @list = List.new(list_params)
    @list.user_id = current_user.id

    tags = params["selectedTags"]

    if @list.save
      create_taggings(tags, @list.id)

      respond_to do |format|
        format.json { render json: @list.to_tree }
      end
    else
      respond_to do |format|
        format.json {}
      end
    end
  end

  def index
    @lists = List.popular

    formatted = []
    @lists.each do |list|
      formatted.push(list.to_tree)
    end

    respond_to do |format|
      format.json { render json: formatted }
    end

  end


  private

  def create_taggings(tags, list_id)
    tags.map! do |tag|
      if !tag[:id]
        saved_tag = Tag.create(name: tag[:name])
        tag[:id] = saved_tag.id
      end
      
      return tag
    end

    tags.each do |tag|
      ListTagging.create(list_id: list_id, tag_id: tag.id)
    end

  end

  def list_params
    params.require(:list).permit(:title, :description)
  end
end
