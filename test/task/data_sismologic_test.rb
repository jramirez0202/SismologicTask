# test/tasks/data_sismologic_test.rb

require 'test_helper'
require 'rake'

class DataSismologicTest < ActiveSupport::TestCase
  setup do
    @rake = Rake::Application.new
    Rake.application = @rake
    load File.expand_path("../../../lib/tasks/data_sismologic.rake", __FILE__)
    Rake::Task.define_task(:environment)
  end

  test 'should fetch feature data from the last 30 days and save to database' do
    assert_difference 'Feature.count', 1 do
      assert_output(/Data obtained for the last 30 days: Success/) do
        @rake['data:sync'].invoke
      end
    end

    # Aquí puedes agregar aserciones adicionales para verificar los datos obtenidos
    # por la tarea data_sismologic y su inserción en la base de datos
  end
end
