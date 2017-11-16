class Doorkeeper::AuthorizationsController
  before_action :correct_uri



  private

  def correct_uri
    if params[:redirect_uri]
      uri = params[:redirect_uri]

      if uri[0..6] == "https:/" && uri[7] != "/"
        params[:redirect_uri] = "https://"
      end
    end
  end


end