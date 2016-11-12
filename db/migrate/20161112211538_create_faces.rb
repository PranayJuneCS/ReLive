class CreateFaces < ActiveRecord::Migration[5.0]
  def change
    create_table :faces do |t|
      t.string :height
      t.string :left
      t.string :top
      t.string :width
      t.string :emotion
      t.string :score
      t.references :photo, foreign_key: true

      t.timestamps
    end
  end
end
