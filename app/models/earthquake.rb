class Earthquake < ApplicationRecord
  def as_json(options = {})
    super(only: [:magnitude, :place, :time, :tsunami, :mag_type, :title, :longitude, :latitude, :url])
  end
end
