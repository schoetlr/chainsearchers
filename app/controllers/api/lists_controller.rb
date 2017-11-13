class API::ListsController < ListsController
  skip_filter :authenticate_user!
  protect_from_forgery except: [:create, :update]
  before_action :doorkeeper_authorize!#, if: :public_user?

  def create
    super
  end

  protected
  
  # def current_user
  #  @current_user = User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  #  byebug
  #  #@current_user = User.where(username: "anonymous") if !@current_user
  # end

  private

  def public_user?
    !!request.headers["Authorization"]
  end

  

end