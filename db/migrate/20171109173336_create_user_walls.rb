class CreateUserWalls < ActiveRecord::Migration
  def change
    create_table :user_walls do |t|
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
