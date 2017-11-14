class RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user!
  
  
  protected

  def after_inactive_sign_up_path_for(resource)
    confirm_notice_path
  end

  def sign_up_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :confirmed_at, :confirmation_sent_at, :confirmation_token)
  end

  def account_update_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :current_password, :confirmation_token)
  end

  

  
end