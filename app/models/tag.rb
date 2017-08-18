class Tag < ActiveRecord::Base
  has_many :list_taggings
  has_many :lists, through: :list_taggings

  validates :name, length: { maximum: 20 }

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


end
