class AddCustomIdToFeatures < ActiveRecord::Migration[7.0]
  def change
    add_column :features, :feature_id, :string
    add_index :features, :feature_id, unique: true
  end
end
