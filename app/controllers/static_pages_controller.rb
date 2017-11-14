class StaticPagesController < ApplicationController
  skip_filter :authenticate_user!

  def home
  end

  def confirm_notice
  end
end
