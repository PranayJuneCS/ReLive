class AddLongToPhotos < ActiveRecord::Migration[5.0]
  def change
    add_column :photos, :longitude, :string
  end
end
