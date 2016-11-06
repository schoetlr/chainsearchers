class Link < ActiveRecord::Base
  has_many :links
  belongs_to :link
  belongs_to :list


  def to_node
    json = {}

    json.merge!(self.attributes)
    json["children"] = self.links.map { |link| link.to_node }

    json
  end
end
