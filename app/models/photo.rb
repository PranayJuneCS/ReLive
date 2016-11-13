require 'unirest'

class Photo < ApplicationRecord
  GEOCODE_KEY = "AIzaSyCQfdukndtwTf1_u1WXSeFXdM7QbA0dZRg"
  AMADEUS_KEY = "3nWhAi9MARcfnjux7wwghgixAjSuLJhe"
  belongs_to :user
  has_many :tags
  has_many :captions
  has_many :faces

  after_create :process_ai

  def process_ai
    require 'json'
    require 'net/http'

    uri = URI('https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Description&language=en')

    request = Net::HTTP::Post.new(uri.request_uri)
    # Request headers
    request['Content-Type'] = 'application/json'
    # Request headers
    request['Ocp-Apim-Subscription-Key'] = 'f82254a0c2d94549b7363616bbc6743f'
    # Request body
    request.body = { 'url': self.url }.to_json

    response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
        http.request(request)
    end

    body = JSON.parse(response.body)

    if body["description"]
      tags = body["description"]["tags"]

      length = [5, tags.length].min
      length.times do |i|
        Tag.create(text: tags[i], photo_id: self.id)
      end
      caption = body["description"]["captions"]
      if caption[0]
        Caption.create(text: caption[0]["text"], photo_id: self.id)
      end
    else
      puts "no description"
    end

    # Make a new request for emotions
    uri = URI('https://api.projectoxford.ai/emotion/v1.0/recognize')
    uri.query = URI.encode_www_form({
    })

    request = Net::HTTP::Post.new(uri.request_uri)
    # Request headers
    request['Content-Type'] = 'application/json'
    # Request headers
    request['Ocp-Apim-Subscription-Key'] = '1174d709d44e412dbcc174d62bf2ba54'
    # Request body
    request.body = { 'url': self.url }.to_json

    response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
        http.request(request)
    end

    puts response.body

    data = JSON.parse(response.body)
    if data.kind_of?(Array)
      data.each do |emotion|
        # an array of datapoints
        coordinates = emotion["faceRectangle"];
        scores = emotion["scores"]
        max_score = scores.max_by { |k, v| v.to_f }
        Face.create(height: coordinates["height"], left: coordinates["left"], top: coordinates["top"],
          width: coordinates["width"], emotion: max_score[0], score: max_score[1], photo_id: self.id);
      end

    end

  end

  def update_caption_and_tags(caption, tags)
    my_caption = self.captions.find_by(photo_id: self.id)
    if my_caption
      my_caption.text = caption
      my_caption.save
    else
      Caption.create(text: caption, photo_id: self.id)
    end

    self.tags.destroy_all
    tags.length.times do |i|
      Tag.create(text: tags[i], photo_id: self.id)
    end
  end

  def add_city(city)
    if city and not city.empty?
      self.city = city

      if self.city
        require 'json'
        require 'net/http'

        puts self.city
        uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + self.city
        uri = URI(uri)

        request = Net::HTTP::Get.new(uri.request_uri)

        response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
            http.request(request)
        end

        body = JSON.parse(response.body)

        if body["results"]
          self.latitude = body["results"][0]["geometry"]["location"]["lat"]
          self.longitude = body["results"][0]["geometry"]["location"]["lng"]

          require 'json'
          require 'net/http'

          uri = 'https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?';
          uri += ("apikey=" + Photo::AMADEUS_KEY)
          uri += ("&latitude=" + self.latitude)
          uri += ("&longitude=" + self.longitude)
          uri = URI(uri)

          request = Net::HTTP::Get.new(uri.request_uri)

          response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
              http.request(request)
          end

          body = JSON.parse(response.body)

          if body[0]
            self.airport = body[0]["airport"]
          end
        end
      end
    end

    self.save
  end
end
