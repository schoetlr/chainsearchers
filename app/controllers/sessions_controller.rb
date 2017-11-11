class SessionsController < Devise::SessionsController
  before_filter :configure_sign_in_params, only: [:new, :create]

  
  def new
    store_return_to
    super
  end

  def create
    store_return_to
    super
    if current_user
      session[:user_id] = current_user.id
    end
  end

  def destroy
    session[:user_id] = nil
    super
  end

  protected

  #put the redirect_uri in the params array
  def configure_sign_in_params
    devise_parameter_sanitizer.for(:sign_in) << :redirect_uri
  end

  private

  def store_return_to
    session[:return_to] = params[:redirect_uri] if params[:redirect_uri]
  end

end