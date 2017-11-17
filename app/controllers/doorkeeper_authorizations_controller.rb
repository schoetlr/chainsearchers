class Doorkeeper::AuthorizationsController
  before_action :correct_uri
  
  # before_action :set_headers


  private

  def correct_uri
    if params[:redirect_uri]
      uri = params[:redirect_uri]
      logger.debug "The original URI in params is: " + uri
      if uri[0..6] == "https:/" && uri[7] != "/"
        params[:redirect_uri] = "https://" + params[:redirect_uri][7..-1]
      end
      logger.debug "The altered URI is: " + params[:redirect_uri]
    end
  end


end