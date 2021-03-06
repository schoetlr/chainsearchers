class ListTagging < ActiveRecord::Base
  belongs_to :list
  belongs_to :tag, counter_cache: :lists_count

  def self.untag(untagged, list_id)
    untagged.each do |tag|
      tag_to_remove = ListTagging.where(list_id: list_id, tag_id: tag.id)[0]
      tag_to_remove.destroy
    end
  end

  def self.create_taggings(tags, list_id)
    tags.each do |tag|
      ListTagging.create(tag.id, list_id)
    end
  end

end
