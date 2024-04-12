class CreateFeatures < ActiveRecord::Migration[7.0]
  def change
    create_table :features do |t|
      t.float :magnitude
      t.string :place
      t.datetime :time
      t.boolean :tsunami
      t.string :mag_type
      t.string :title
      t.float :longitude
      t.float :latitude
      t.string :url

      t.timestamps
    end
  end
end
