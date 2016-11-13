require 'unirest'

class User < ApplicationRecord
  has_many :photos
  AMADEUS_KEY = "3nWhAi9MARcfnjux7wwghgixAjSuLJhe";

  def update_location(lat, lng)
    require 'json'
    require 'net/http'

    uri = 'https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?';
    uri += ("apikey=" + User::AMADEUS_KEY)
    uri += ("&latitude=" + lat)
    uri += ("&longitude=" + lng)
    uri = URI(uri)

    request = Net::HTTP::Get.new(uri.request_uri)

    response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
        http.request(request)
    end

    body = JSON.parse(response.body)

    if body[0]
      self.airport = body[0]["airport"]
    end
  	self.save
  end
end
