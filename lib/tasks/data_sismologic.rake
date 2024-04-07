require 'httparty'

namespace :data do
  desc "get data from https://earthquake.usgs.gov"
  task sync: :environment do
    ActiveRecord::Base.transaction do
      begin
        # Calcula los últimos 30 días
        end_date = Date.today
        start_date = end_date - 30

        start_date_str = start_date.strftime("%Y-%m-%d")
        end_date_str = end_date.strftime("%Y-%m-%d")

        url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson?starttime=#{start_date_str}&endtime=#{end_date_str}"

        response = HTTParty.get(url)
        @datos = JSON.parse(response.body)['features']

        puts "Data obtained for the last 30 days: Success"

        # Mapea los datos para la inserción masiva
        earthquake_data = @datos.map do |data|
          {
            custom_id: data['id'],
            url: data['properties']['url'],
            magnitude: data['properties']['mag'],
            place: data['properties']['place'],
            time: Time.at(data['properties']['time'] / 1000),
            tsunami: data['properties']['tsunami'],
            mag_type: data['properties']['magType'],
            title: data['properties']['title'],
            longitude: data['geometry']['coordinates'][0],
            latitude: data['geometry']['coordinates'][1]
          }
        end

        valid_earthquake_data = earthquake_data.reject do |earthquake|
          valid = earthquake.present? &&
            earthquake[:title].present? &&
            earthquake[:url].present? &&
            earthquake[:place].present? &&
            earthquake[:mag_type].present? &&
            earthquake['geometry'].present? &&
            earthquake['geometry']['coordinates'].present?
          
          # puts "Invalid: #{earthquake}" unless valid
        
          valid
        end
        
        

        Earthquake.create!(valid_earthquake_data)

        puts "Save Sismologic Data: Success"
      rescue StandardError => e
        puts "Error fetching data from the API: #{e.message}"
        raise ActiveRecord::Rollback
      end
    end
  end
end
