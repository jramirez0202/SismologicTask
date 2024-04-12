class Api::V1::FeaturesController < ApplicationController
  def index
    @feature = Feature.all

    # Filtrar por mag_type si se proporciona en los parámetros de la solicitud
    if params[:filters] && params[:filters][:mag_type]
      mag_types_to_filter = params[:filters][:mag_type].split(',')
      @feature = Feature.by_mag_type(mag_types_to_filter)
    end

    # Paginar los resultados con Kaminari
    @feature = @feature.page(params[:page]).per(per_page_limit)

    # Mapear los datos de terremotos al formato requerido
    data = @feature.map do |feature|
      {
        id: feature.id,
        type: "feature",
        attributes: {
          feature_id: feature.feature_id.to_s,
          magnitude: feature.magnitude,
          place: feature.place,
          time: feature.time.strftime("%Y-%m-%d %H:%M:%S"),
          tsunami: feature.tsunami,
          mag_type: feature.mag_type,
          title: feature.title,
          coordinates: {
            longitude: feature.longitude,
            latitude: feature.latitude
          }
        },
        links: {
          external_url: feature.url
        }
      }
    end

    # Construir la respuesta JSON según el formato requerido
    response_json = {
      data: data,
      pagination: {
        current_page: @feature.current_page,
        total_page: @feature.total_count,
        per_page: @feature.limit_value
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
