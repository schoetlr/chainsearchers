class API::LinksController < API::APIController
  protect_from_forgery except: [:create]
  before_action :doorkeeper_authorize!, if: :public_user?


  def create
    @link = Link.new(links_params)

    if resource_owner
      @link.user_id = resource_owner.id
    end

    if @link.save
      respond_to do |format|
        format.json {}
      end
    else
      respond_to do |format|
        format.json {}
      end
    end

  end


  private

  def links_params
    params.require(:link).permit(:url, :description)
  end
end