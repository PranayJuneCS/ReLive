class Photo < ApplicationRecord
  belongs_to :user
  has_many :tags
  has_many :captions
end
