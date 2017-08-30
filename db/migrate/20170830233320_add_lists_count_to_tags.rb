class AddListsCountToTags < ActiveRecord::Migration
  def change
    add_column :tags, :lists_count, :integer
  end
end
