class RemoveIgUsernameFromUsers < ActiveRecord::Migration[5.0]
  def change
  	remove_column :users, :ig_username, :string
  end
end
