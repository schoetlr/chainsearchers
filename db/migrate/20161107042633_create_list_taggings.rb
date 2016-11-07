class CreateListTaggings < ActiveRecord::Migration
  def change
    create_table :list_taggings do |t|
      t.integer :tag_id
      t.integer :list_id

      t.timestamps null: false
    end

    add_index :list_taggings, [:tag_id, :list_id]
  end
end
