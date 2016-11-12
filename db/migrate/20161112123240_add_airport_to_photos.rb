class AddAirportToPhotos < ActiveRecord::Migration[5.0]
  def change
    add_column :photos, :airport, :string
  end
end
