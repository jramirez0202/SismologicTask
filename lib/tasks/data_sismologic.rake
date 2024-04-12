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
        puts "Past 30 days Data obtained: Success"

        #Llame feature_id a el ID que entrega la data.
        feature_data = last_30_days_data.map do |data|
          {
            feature_id: data['id'],
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

        valid_feature_data = feature_data.reject do |feature|
          validateFields = feature.present? &&
            feature[:title].present? &&
            feature[:url].present? &&
            feature[:place].present? &&
            feature[:mag_type].present? &&
            feature[:magnitude].present? &&
            feature['geometry'].present? &&
            feature['geometry']['coordinates'].present?
        
            unless validateFields
              missing_fields = feature.select { |key, value| value.nil? }
              if missing_fields.any?
                puts "Error: Missing required fields for feature data: #{missing_fields.keys}"
              end
            end
        
            validateRanges = (
              feature[:magnitude].between?(-1.0, 10.0) &&
              feature[:latitude].between?(-90.0, 90.0) &&
              feature[:longitude].between?(-180.0, 180.0)
            )
        
          #Esta validacion mostrara los registros en consola de todos los rangos que no cumplen y no persistiran.
          unless validateRanges
            puts "Error: Data out of range values: #{feature}"
          end
        
          validateFields && validateRanges

        end
        
        Feature.create!(valid_feature_data)

        puts "Save Sismologic Data: Success"
      rescue StandardError => e
        puts "Error: invalid ranges, check this fields: #{e.message}"
        raise ActiveRecord::Rollback
      end
    end
  end
end
