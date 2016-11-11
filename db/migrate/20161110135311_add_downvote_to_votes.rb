class AddDownvoteToVotes < ActiveRecord::Migration
  def change
    add_column :votes, :downvote, :boolean, default: false
  end
end
