class StaticPagesController < ApplicationController
  skip_filter :authenticate_user!, only: [:home]

  def home
  end

  def confirm_notice
  end
end
