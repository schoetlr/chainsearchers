class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :user_id
      t.integer :list_id

      t.timestamps null: false
    end

    add_index :votes, [:user_id, :list_id]
    add_index :votes, :list_id
    add_index :votes, :user_id
  end
end
