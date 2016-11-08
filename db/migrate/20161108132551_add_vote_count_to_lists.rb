class AddVoteCountToLists < ActiveRecord::Migration
  def change
    add_column :lists, :vote_count, :integer, default: 0
  end
end
