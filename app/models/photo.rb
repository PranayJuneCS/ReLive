require 'unirest'

class Photo < ApplicationRecord
  belongs_to :user
  has_many :tags
  has_many :captions
  has_many :faces

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

    # Make a new request for emotions
    response = Unirest.post "https://api.projectoxford.ai/emotion/v1.0/recognize",
                            headers: { "Content-Type": "application/json", "Host": "api.projectoxford.ai", "Ocp-Apim-Subscription-Key": "1174d709d44e412dbcc174d62bf2ba54" },
                            parameters: { 'url': self.url }.to_json
    require 'json'
    emotions = Hash.from_xml(response.body)
    data = emotions["ArrayOfFaceRecognitionResult"]["FaceRecognitionResult"]
    if data.kind_of?(Array)
      # an array of datapoints
    else
      # a single datapoint
      coordinates = data["faceRectangle"];
      scores = data["scores"]
      max_score = scores.max_by { |k, v| v.to_f }
      Face.create(height: coordinates["height"], left: coordinates["left"], top: coordinates["top"],
        width: coordinates["width"], emotion: max_score[0], score: max_score[1], photo_id: self.id);
    end

  end

  def update_caption_and_tags(caption, tags)
    my_caption = self.captions.find_by(photo_id: self.id)
    my_caption.text = caption
    self.tags.destroy_all
    tags.length.times do |i|
      Tag.create(text: tags[i], photo_id: self.id)
    end
  end
end
