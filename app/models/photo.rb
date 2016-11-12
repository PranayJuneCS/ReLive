require 'unirest'

class Photo < ApplicationRecord
  GEOCODE_KEY = "AIzaSyCQfdukndtwTf1_u1WXSeFXdM7QbA0dZRg"
  AMADEUS_KEY = "3nWhAi9MARcfnjux7wwghgixAjSuLJhe"
  belongs_to :user
  has_many :tags
  has_many :captions

  after_create :process_ai

  def process_ai
    response = Unirest.post "https://api.projectoxford.ai/vision/v1.0/describe",
                            headers: {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': '68c50c26771e49fe85f6640afd72ba9e'},
                            parameters: { 'url': self.url }.to_json

    tags = response.body["description"]["tags"]

    length = [10, tags.length].min
    length.times do |i|
      Tag.create(text: tags[i], photo_id: self.id)
    end

    caption = response.body["description"]["captions"]
    Caption.create(text: caption[0]["text"], photo_id: self.id)
  end

  def update_caption_and_tags(caption, tags)
    my_caption = self.captions.find_by(photo_id: self.id)
    my_caption.text = caption
    self.tags.destroy_all
    tags.length.times do |i|
      Tag.create(text: tags[i], photo_id: self.id)
    end
  end

  def add_city(city)
    self.city = city

    if self.city
      response = Unirest.get "https://maps.googleapis.com/maps/api/geocode/json?",
                             parameters: {
                                key: Photo::GEOCODE_KEY,
                                address: self.city
                             }
      self.latitude = response.body["results"][0]["geometry"]["location"]["lat"]
      self.longitude = response.body["results"][0]["geometry"]["location"]["lng"]

      response = Unirest.get "https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant",
                             parameters: {
                                apikey: Photo::AMADEUS_KEY,
                                latitude: self.latitude,
                                longitude: self.longitude
                             }
      self.airport = response.body[0]["airport"]
    end

    self.save
  end
end
