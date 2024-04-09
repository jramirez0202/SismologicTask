require "test_helper"

class Api::V1::EarthquakesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_earthquakes_index_url
    assert_response :success
  end
end
