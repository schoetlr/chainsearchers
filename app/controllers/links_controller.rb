class LinksController < ApplicationController

  def create
    list_id = params[:list_id].to_i
    list_links = []

    params[:links].each do |link_data|
      link = Link.new(link_params(link_data))
      link.list_id = list_id
      link.save
      
      if list_links.length > 0
        link.link_id = list_links.last.id
        link.save
      end

      list_links.push(link)
    end

    respond_to do |format|
      format.json { render json: {} }
    end

  end

  private

  def link_params(link_data)
    link_data.permit(:url, :description)
  end
end
