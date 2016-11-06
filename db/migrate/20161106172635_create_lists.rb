class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.integer :user_id
      t.string :title, null: false
      t.text :description

      t.timestamps null: false
    end

    add_index :lists, :user_id
  end
end
