Rails.application.routes.draw do
  get 'filters/index'
  get 'earthquakes/index'
  namespace :api do
    namespace :v1 do
      resources :earthquakes, only: [:index]
    end
  end
  # get '/getData', to: 'datos#getData'
  root 'home#index'
end

