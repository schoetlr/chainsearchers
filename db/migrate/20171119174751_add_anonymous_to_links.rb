class AddAnonymousToLinks < ActiveRecord::Migration
  def change
    add_column :links, :anonymous, :boolean
  end
end
