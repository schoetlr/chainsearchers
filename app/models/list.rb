class List < ActiveRecord::Base
  belongs_to :user
  has_one :link


  def to_tree
    json = {}

    json.merge!(self.attributes)

    json["link"] = self.link.to_node

    json
  end
end
