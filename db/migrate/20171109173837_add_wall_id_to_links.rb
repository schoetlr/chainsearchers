class AddWallIdToLinks < ActiveRecord::Migration
  def change
    add_column :links, :user_wall_id, :integer, default: nil
  end
end
