class API::ListsController < API::APIController
  protect_from_forgery except: [:create, :update]
  before_action :doorkeeper_authorize!, if: :logged_in_user?

  def create
    @list = List.new(list_params)

    @list.user_id = resource_owner.id if resource_owner
    #model takes care of the javascript object tags
    @list.tags = params["selectedTags"]

    #need to refactor so links/tags are handled by accepts_nested_attributes_for method

    if @list.save
      wall_id = @list.user.wall.id if resource_owner
      
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

    #add the new links to the existing links
    
    Link.update_links(params[:links], @list.id, params["postToWall"], wall_id) 

    if @list.update(list_params)
      respond_to do |format|
        format.json { render json: @list }
      end
    end
  end

  private

  def list_params
    params.require(:list).permit(:title, :description)
  end

  

end