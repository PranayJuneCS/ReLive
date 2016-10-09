class CreateCaptions < ActiveRecord::Migration[5.0]
  def change
    create_table :captions do |t|
      t.references :photo, foreign_key: true
      t.string :text

      t.timestamps
    end
  end
end
