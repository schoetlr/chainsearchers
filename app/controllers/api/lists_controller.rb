class API::ListsController < ListsController
  skip_filter :authenticate_user!
  protect_from_forgery except: [:create, :update]
  before_action :doorkeeper_authorize!#, if: :public_user?

  def create

    @list = List.new(list_params)

    @list.user_id = resource_owner.id
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

  private

  def resource_owner
   @resource_owner = User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
   
   #@current_user = User.where(username: "anonymous") if !@current_user
  end

  

  def public_user?
    !!request.headers["Authorization"]
  end

  

end