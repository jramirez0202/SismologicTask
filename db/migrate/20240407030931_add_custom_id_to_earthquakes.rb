class AddCustomIdToEarthquakes < ActiveRecord::Migration[7.0]
  def change
    add_column :earthquakes, :custom_id, :string
    add_index :earthquakes, :custom_id, unique: true
  end
end
