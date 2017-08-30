class Tag < ActiveRecord::Base
  has_many :list_taggings
  has_many :lists, through: :list_taggings

  validates :name, length: { maximum: 20 }

  scope :popular, -> { order('lists_count DESC') }

  def name=(value)
    value.downcase!
    value.gsub!(" ", "")

    super(value)
  end

  def self.create_tags(tags)
    #tags is an array of javascript objects
    @tags = []
    tags.each do |tag|
      found_or_created_tag = Tag.find_or_create_by(name: tag[:name])
      @tags.push(found_or_created_tag) 
    end

    @tags

  end

  def self.update_tags(tags, list_id)
    tags = tags ? tags : []
    tags = Tag.create_tags(tags)

    @list = List.find(list_id)
    
    untagged = @list.tags - tags

    ListTagging.untag(untagged, list_id)

  end



end
