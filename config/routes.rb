Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :features, only: [:index] do
        resources :comments, only: [:create]
      end
      get 'filters', to: 'filters#search_by_mag_type'
    end
  end
  root 'home#index'
end
