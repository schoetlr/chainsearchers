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

  def update
    @link = Link.find(params[:id])
    @link.url = params[:url]
    @link.description = params[:description]

    if @link.save
      respond_to do |format|
        format.json { render json: @link }
      end
    end    
  end

  def destroy
    @link = Link.find(params[:id])

    if @link.destroy
      respond_to do |format|
        format.json { render json: @link }
        format.html {}
      end
    end
  end

  private

  def link_params(link_data)
    link_data.permit(:url, :description)
  end
end
