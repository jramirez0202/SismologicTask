require_relative '../get_data_sismologic'

namespace :data do
  desc "get data from https://earthquake.usgs.gov"
  task sync: :environment do
    ActiveRecord::Base.transaction do
      begin
        # Obtener todos los datos desde get_data_sismologic.rb
        @datos = GetDataSismologic.fetch_data

        # Filtrar solo los últimos 30 días
        last_30_days_data = @datos.select do |data|
          time = Time.at(data['properties']['time'] / 1000)
          time >= (Date.today - 30)
        end
        puts "Data Past 30 days obtained: Success"

        #Llame custom_id a el ID que entrega la data.
        earthquake_data = last_30_days_data.map do |data|
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
          validateFields = earthquake.present? &&
            earthquake[:title].present? &&
            earthquake[:url].present? &&
            earthquake[:place].present? &&
            earthquake[:mag_type].present? &&
            earthquake[:magnitude].present? &&
            earthquake['geometry'].present? &&
            earthquake['geometry']['coordinates'].present?
        
            unless validateFields
              missing_fields = earthquake.select { |key, value| value.nil? }
              if missing_fields.any?
                puts "Error: Missing required fields for earthquake data: #{missing_fields.keys}"
              end
            end
        
            validateRanges = (
              earthquake[:magnitude].between?(-1.0, 10.0) &&
              earthquake[:latitude].between?(-90.0, 90.0) &&
              earthquake[:longitude].between?(-180.0, 180.0)
            )
        
          #Esta validacion mostrara los registros en consola de todos los rangos que no cumplen y no persistiran.
          unless validateRanges
            puts "Error: Out of range values: #{earthquake}"
          end
        
          validateFields && validateRanges

        end
        
        Earthquake.create!(valid_earthquake_data)

        puts "Save Sismologic Data: Success"
      rescue StandardError => e
        puts "Error: invalid ranges, check this fields: #{e.message}"
        raise ActiveRecord::Rollback
      end
    end
  end
end
