class RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user!
  
  
  protected

  def after_inactive_sign_up_path_for(resource)
    confirm_notice_path
  end

  def sign_up_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :current_password)
  end

  

  
end