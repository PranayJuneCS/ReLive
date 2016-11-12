require 'unirest'

class User < ApplicationRecord
  has_many :photos
  AMADEUS_KEY = "3nWhAi9MARcfnjux7wwghgixAjSuLJhe";

  def update_location(lat, lng)
	response = Unirest.get "https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant",
  						   parameters: {
  						   	 apikey: User::AMADEUS_KEY,
  						   	 latitude: lat,
  						   	 longitude: lng
  						   }
  	self.airport = response.body[0]["airport"]
  	self.save
  end
end
