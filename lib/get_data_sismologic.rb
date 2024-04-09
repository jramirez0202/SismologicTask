require 'httparty'

class GetDataSismologic
  def self.fetch_data
    url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
    response = HTTParty.get(url)
    JSON.parse(response.body)['features']
  end
end
