class AddLatToPhotos < ActiveRecord::Migration[5.0]
  def change
  	add_column :photos, :latitude, :string
  end
end
