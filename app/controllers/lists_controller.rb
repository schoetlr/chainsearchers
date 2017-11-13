class ListsController < ApplicationController
  skip_filter :authenticate_user!, only: [:index, :show]
  before_filter :validate_ownership, only: [:update, :destroy]

  def create
    @list = List.new(list_params)

    @list.user_id = current_user.id
    #model takes care of the javascript object tags
    @list.tags = params["selectedTags"]

    #need to refactor so links/tags are handled by accepts_nested_attributes_for method

    if @list.save
      wall_id = @list.user.wall.id
      
      Link.create_links(params["links"], @list.id, params["postToWall"], wall_id)

      respond_to do |format|
        format.json { render json: @list.to_tree }
      end
    else
      respond_to do |format|
        format.json {}
      end
    end
  end

  def update
    @list = List.find(params[:id])
    @list.tags = params[:tags]
    wall_id = current_user.wall.id
    
    Link.update_links(params[:links], @list.id, params["postToWall"], wall_id) 

    if @list.update(list_params)
      respond_to do |format|
        format.json { render json: @list }
      end
    end
  end


  def index
    tags = params[:tags]
    option = params[:option]
    tags = !tags ? [] : tags
    
    #I believe I am filtering lists on front end now
    if tags.length > 0 && option == "Popular"
      @lists = List.popular_with_tags(tags)
    elsif tags.length == 0 && option == "Popular"
      @lists = List.popular
    elsif tags.length > 0 && option == "Recent"
      @lists = List.recent_with_tags(tags)
    elsif tags.length == 0 && option == "Recent"
      @lists = List.recent
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

  def destroy
    @list = List.find(params[:id])
    #get all the links of the list and destroy them
    links = []
    link = @list.link
    until !link
      links.push(link)
      link = link.links[0]
    end

    links.each { |link| link.destroy }
    @list.destroy

    respond_to do |format|
      format.json { render json: @list }
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

  def validate_ownership
    list_id = params[:id].to_i
    owner = current_user.lists.pluck(:id).include?(list_id)

    unless owner
      redirect_to :back
    end
  end

  def list_params
    params.require(:list).permit(:title, :description)
  end
end
