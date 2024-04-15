# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:


#
# Crear cuatro registros con contenido ligeramente diferente
4.times do |i|
  random_str = SecureRandom.alphanumeric(7)
  feature_id = "#{rand(100)}#{random_str}"
  feature = Feature.create(
    feature_id: feature_id,
    magnitude: "3.3",
    place: "Chile",
    time: Time.now,
    tsunami: "si",
    mag_type: "ml",
    title: "test_seed #{i + 1}", # Cambia el título para cada registro
    longitude: 0.1,
    latitude: 0.1,
    url: "https://algo.com"
  )

  Comment.create(
    body: "Primer comentario #{i + 1}", # Cambia el cuerpo del comentario para cada registro
    feature: feature
  )
end

