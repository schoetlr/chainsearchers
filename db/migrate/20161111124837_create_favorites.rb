class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id
      t.integer :list_id

      t.timestamps null: false
    end

    add_index :favorites, :user_id
    add_index :favorites, :list_id
  end
end
