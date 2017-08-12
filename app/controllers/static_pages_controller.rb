class StaticPagesController < ApplicationController
  skip_filter :authenticate_user!, only: [:home]

  def home
  end
end
