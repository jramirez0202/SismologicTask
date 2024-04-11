class Api::V1::FiltersController < ApplicationController
  protect_from_forgery with: :null_session
  
  def search_by_mag_type 
    if params[:filters] && params[:filters][:mag_type]
      mag_types_to_filter = params[:filters][:mag_type].split(',')
      @mag_types = Earthquake.by_mag_type(mag_types_to_filter).pluck(:mag_type).uniq
    else
      @mag_types = Earthquake.pluck(:mag_type).uniq
    end

    render json: { mag_types: @mag_types }
  end
end
