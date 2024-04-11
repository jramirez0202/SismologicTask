Rails.application.routes.draw do
  
  # get 'earthquakes/index'
  namespace :api do
    namespace :v1 do
      resources :earthquakes, only: [:index]
      get 'filters', to: 'filters#search_by_mag_type'
    end
  end
  # get '/getData', to: 'datos#getData'
  root 'home#index'
end

