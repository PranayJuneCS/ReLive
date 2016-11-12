class AddCityToPhotos < ActiveRecord::Migration[5.0]
  def change
    add_column :photos, :city, :string
  end
end
