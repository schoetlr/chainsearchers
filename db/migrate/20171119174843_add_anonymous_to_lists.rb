class AddAnonymousToLists < ActiveRecord::Migration
  def change
    add_column :lists, :anonymous, :boolean
  end
end
