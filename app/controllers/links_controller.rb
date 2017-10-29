#THE ONLY THING BEING USED IN THIS CONTROLLER IS DESTROY.
#I just haven't got around to cleaning it up.
#create and update logic was moved to the model so it can be called from the lists controller


class LinksController < ApplicationController
  before_action :validate_ownership, only: [:update, :destroy]

  def create
    list_id = params[:list_id].to_i
    list_links = []
    @list = List.find(list_id)

    params[:links] = !params[:links] ? [] : params[:links]

    params[:links].each do |link_data|
      next if !link_data[:url] && !link_data[:description]

      link = Link.new(link_params(link_data))
      link.list_id = list_id
      link.save
      #give the newly created link the proper parent
      if list_links.length > 0
        link.link_id = list_links.last.id
        link.save
      #don't think this is being used...
      elsif params[:update] #if creating from EditListCtrl do this
        last_link = @list.last_link
        link.link_id = last_link.id
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
  #validates the user who made the link is the one destroying it
  def validate_ownership
    @link = Link.find(params[:id])
    list_id = @link.list.id
    owner = current_user.lists.pluck(:id).include?(list_id)

    unless owner
      redirect_to :back
    end
  end

  def link_params(link_data)
    link_data.permit(:url, :description)
  end
end
