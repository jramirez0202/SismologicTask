class DatosController < ApplicationController

  def getData
    response = HTTParty.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
    @datos = JSON.parse(response.body)['features']
  rescue StandardError => e
    flash[:alert] = "Error fetching data from the API: #{e.message}"
    @datos = [] # Inicializar @datos como un array vacío en caso de error
  end

end
