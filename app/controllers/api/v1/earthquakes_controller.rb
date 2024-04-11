class Api::V1::EarthquakesController < ApplicationController
  def index
    @earthquakes = Earthquake.all

    # Filtrar por mag_type si se proporciona en los parámetros de la solicitud
    if params[:filters] && params[:filters][:mag_type]
      mag_types_to_filter = params[:filters][:mag_type].split(',')
      @earthquakes = Earthquake.by_mag_type(mag_types_to_filter)
    end

    # Paginar los resultados con Kaminari
    @earthquakes = @earthquakes.page(params[:page]).per(per_page_limit)

    # Mapear los datos de terremotos al formato requerido
    data = @earthquakes.map do |earthquake|
      {
        id: earthquake.id,
        type: "feature",
        attributes: {
          custom_id: earthquake.custom_id.to_s,
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
        current_page: @earthquakes.current_page,
        total_page: @earthquakes.total_count,
        per_page: @earthquakes.limit_value
      }
    }

    render json: response_json
  end

  private

  # Método privado para validar que per_page sea menor o igual a 1000
  def per_page_limit
    params[:per_page].to_i <= 1000 ? params[:per_page] : 1000
  end
end
