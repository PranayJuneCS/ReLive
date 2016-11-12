require 'net/http'
require 'json'
require 'square_connect'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :get_info, :except => [:login]

  @@client_id = "de0534bfebd644c6b8264da9c1cff6c6"
  @@client_secret = "52176792ef1e4cb98f13cdbab2689c2e"
  @@redirect_uri = Rails.env.development? ? "http://localhost:3000/login" : "https://filterz.herokuapp.com/login"

  # Before filter
  def get_info
    @user = User.find_by(uid: session[:access_token])
  end

  # Render "/"
  def root
    # if @user.nil?
    #   redirect_to '/landing'
    # end
  end

  def landing
    @target = "https://api.instagram.com/oauth/authorize/?client_id=" + @@client_id + "&redirect_uri=" + @@redirect_uri + "&response_type=code"
    render file: "landing.htm.erb"
  end

  def login
    code = params[:code]
    if !code.nil?
      response = Unirest.post "https://api.instagram.com/oauth/access_token",
                              parameters: {client_id: @@client_id,
                                           client_secret: @@client_secret,
                                           grant_type: 'authorization_code',
                                           code: code,
                                           redirect_uri: @@redirect_uri
                                          }
      user = response.body["user"]
      token = response.body["access_token"]
      if User.find_by(uid: token).nil?
        User.create({ uid: token, name: user["full_name"] })
      end
      session[:access_token] = token
    end

    redirect_to action: "root" and return
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
    render json: images.to_json(include: [:tags, :captions])
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
