class Link < ActiveRecord::Base
  has_many :links
  belongs_to :link
  belongs_to :list
  belongs_to :user_wall

  validates :description, length: { maximum: 500 }


  def to_node
    json = {}

    json.merge!(self.attributes)
    json["children"] = self.links.map { |link| link.to_node }

    json
  end

  def self.create_links(links, list_id, wall_post, wall_id)
    #links is an array of hashes(json objects)
    #links have parents to preserve ordering
    #wall_post is a boolean

    #point to last created link id so can assign its id to the next one
    last_created_id = nil

    links.each do |link|
      @link = Link.new(url: link[:url], description: link[:description], list_id: list_id, link_id: last_created_id)
      #assign the link to a UserWall if wall_id is true
      wall_post ? @link.user_wall_id = wall_id : nil
      

      @link.save

      last_created_id = @link.id
    end
  end

  def self.update_links(links, list_id, wall_post, wall_id)
    byebug
    #links is an array of hashes(json objects)
    #links have parents to preserve ordering
    links.each_with_index do |link, i|
      if !link[:id]
        parent_link_id = links[i-1] ? links[i-1][:id] : nil
        @link = Link.new(url: link[:url], description: link[:description],
                    list_id: list_id, link_id: parent_link_id)
        wall_post ? @link.user_wall_id = wall_id : nil

        @link.save
      else
        @link = Link.find(link[:id])
        @link.description = link[:description]
        @link.url = link[:url]
        @link.user_wall_id = wall_post ? wall_id : nil 
        @link.save
      end
    end
  end

  def destroy
    parent_link = self.link
    child_link = self.links[0]

    if parent_link && child_link
      child_link.link_id = parent_link.id
      parent_link.links.push(child_link)

      parent_link.save
      child_link.save
    end
    
    super
  end


end
