class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.integer :list_id
      t.text :url
      t.text :description
      t.boolean :google_search
      t.boolean :youtube_video
      t.integer :link_id

      t.timestamps null: false
    end
  end
end
