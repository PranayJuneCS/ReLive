require 'json'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :get_info

  # Before filter
  def get_info
    @user = User.first
    if @user.nil?
      @user = User.create(name: "global")
    end
  end

  # Render "/"
  def root
  end

  def landing
    render file: "landing.htm.erb"
  end

  def privacy
    render file: "privacypolicy.htm"
  end

  def new_photo
    photo = Photo.create(url: params[:url], user_id: @user.id)
    render json: { "tags": photo.tags, "captions": photo.captions }
  end

  def update_photo
    photo = @user.photos.find_by(url: params[:url]);
    photo.update_caption_and_tags(params[:caption], JSON.parse(params[:tags]))
    photo.add_city(params[:city])
    render json: { "bleh": "bleh" }
  end

  def get_photos
    images = Photo.where(user_id: @user.id)
    render json: images.to_json(include: [:tags, :captions, :faces])
  end

  def card
    token = "sandbox-sq0atb-EV2AVhCoNwAZmYfXvGnvSQ"
    tapi = SquareConnect::TransactionApi.new
    lapi = SquareConnect::LocationApi.new
    begin
      result = tapi.charge(token, lapi.list_locations(token).locations[0].id, {
        idempotency_key: SecureRandom.uuid,
        amount_money: { amount: params[:amount].to_i, currency: 'USD' },
        card_nonce: params[:nonce]
      })
      if result.errors
        render json: {errors: result.errors}
      else
        render json: {transaction: result.transaction}
      end
    rescue SquareConnect::ApiError => e
      render json: {errors: e}
    end
  end

  def update_location
    @user.update_location(params[:lat], params[:lng]);
    render json: { airport: @user.airport }
  end

end
