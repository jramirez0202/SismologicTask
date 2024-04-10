class Earthquake < ApplicationRecord
  scope :by_mag_type, ->(mag_types) { where(mag_type: mag_types) }

  def as_json(options = {})
    super(only: [:magnitude, :place, :time, :tsunami, :mag_type, :title, :longitude, :latitude, :url])
  end


end
