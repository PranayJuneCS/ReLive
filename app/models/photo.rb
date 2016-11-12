require 'unirest'

class Photo < ApplicationRecord
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
end
