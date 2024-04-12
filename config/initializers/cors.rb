Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # Puedes ajustar esto para permitir solicitudes solo desde orígenes específicos
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
