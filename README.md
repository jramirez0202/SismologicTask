# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version 3.1.2

* System dependencies
  PostgreSQL
  React
  Tailwind
  Axios peticiones HTTP(javascrip)

* Gem
  # tools frontend
  gem 'cssbundling-rails'
  gem "tailwindcss-rails", "~> 2.3"


  # tools backend
  gem 'httparty'
  gem 'kaminari'
  gem 'rack-cors'


* Configuration

* Database creation
  Run rails db:create Para crear base de datos

* Database initialization
  No tenemos datos en el seed.rb por ahora no aplica

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

Comando y explicaciones de como hacer funcionar la app Sismologic_task

Entramos en carpeta: 
Prueba Prueba tecnica fongi/prueba_frogmi/sismologic_task

Iremos corriendo diferentes comandos los cuales se identificaran con doble asterisco (**)

Para instalar todas las dependencias necesarias para el proyecto usamos (**) bundle install 

bundle install 

Si obtuvimos una inslacion exitosa seguimos

Ejecutamos la task que nos permite traer la data bajo los parametros del desafio y con ella trabajaremos
para esto usamos el comando (**) rake data:sync  

rake data:sync    

Si todo marcha bien recibiremos 2 mensajes:

"Past 30 days Data obtained: Success"
"Save Sismologic Data: Success"

Ademas recibiremos data que no cumple con lo necesario para ser guardada en la base de datos con el mensaje:

"Error: data out of range values"

Ya tenemos la data podemos levantar el ambiente local. 
Ya que estamos usando rails con react  levatamos usando el comando (**) ./bin/dev 

./bin/dev

Con el ambiente local desplegado podemos acceder a link
http://localhost:3000/ y ver el home de la app.

* Uso de la applicacion:

Tenemos un "search bar" que nos ayuda buscar features a traves de texto presente en el titulo del feature.

Por ejemplo 
-Hawaii
-Cambria

En la seccion de filtros tenemos checkboxes que nos ayudaran a filtrar la data a traves del parametro 
Mag Type esto nos ayuda a tener acceso a informacion segun el tipo de magnitud: md, ml, mb, mww, mwr, mb_lg, mh, mw


Al ser mas de 9 mil registros tenemos un paginado que muestra 25 registros (esto es ajustable)
Podemos hacer consultas desde nuestro siguiendo esta consulta de la api que estamos creando

http://localhost:3000/api/v1/features?&page=1&filters[mag_type]=mww&per_page=10

Tenemos varios campos los cuales podemos combinar para hacer diferentes consultas

* page: Es el numero de la pagina donde se hara la busqueda Ejemplo 

http://localhost:3000/api/v1/features?&page=5&xxxxxxxxxxxxxxxxxx
Aqui estariamos viendo la data de la pagina 5.

* [mag_type]=seria el filtrado md, ml, mb, mww, mwr, mb_lg, mh, mw. Se puede combinar con comas md,mww,ml 

Ejemplo:
http://localhost:3000/api/v1/features?&page=1&filters[mag_type]=mww,mb,ml&xxxxxxxxxxx

Con esta peticion obtendremos solo la data que tienen los campo que agregamos

* per_page: Se refiere a la cantidad de features mostrado por pagina

Ejemplo 

http://localhost:3000/api/v1/features?&page=3&filters[mag_type]=mww&per_page=15

Esta peticion muestra 15 resultado de la data.

