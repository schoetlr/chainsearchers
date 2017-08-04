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
    if params[:tags]
      @lists = List.with_tags(params[:tags])
    else
      @lists = List.popular
    end


    @lists = format_lists(@lists)

    respond_to do |format|
      format.json { render json: @lists }
    end

  end

  def show
    @list = List.find(params[:id])

    respond_to do |format|
      format.json { render json: @list.to_tree }
    end

  end


  private

  def format_lists(lists)
    formatted = []
    lists.each do |list|
      formatted.push(list.to_tree)
    end

    formatted
  end

  def create_taggings(tags, list_id)
    if tags
      tags.map! do |tag|
        if !tag[:id]
          saved_tag = Tag.create(name: tag[:name])
          tag[:id] = saved_tag.id
        end
        
        tag
      end

      tags.each do |tag|
        tagging = ListTagging.new(list_id: list_id, tag_id: tag[:id])
        tagging.save
      end
    end

  end

  def list_params
    params.require(:list).permit(:title, :description)
  end
end
