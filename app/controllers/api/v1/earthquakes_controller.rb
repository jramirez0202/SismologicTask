class Api::V1::EarthquakesController < ApplicationController
  def index
    @earthquakes = Earthquake.all

    # Mapear los datos de terremotos al formato requerido
    data = @earthquakes.map do |earthquake|
      {
        id: earthquake.id,
        type: "feature",
        attributes: {
          custom_id_id: earthquake.custom_id.to_s,
          magnitude: earthquake.magnitude,
          place: earthquake.place,
          time: earthquake.time.strftime("%Y-%m-%d %H:%M:%S"),
          tsunami: earthquake.tsunami,
          mag_type: earthquake.mag_type,
          title: earthquake.title,
          coordinates: {
            longitude: earthquake.longitude,
            latitude: earthquake.latitude
          }
        },
        links: {
          external_url: earthquake.url
        }
      }
    end

    # Construir la respuesta JSON según el formato requerido
    response_json = {
      data: data,
      pagination: {
        current_page: 1, # Puedes ajustar según necesites
        total: @earthquakes.count,
        per_page: @earthquakes.count # Puedes ajustar según necesites
      }
    }

    render json: response_json
  end
end
