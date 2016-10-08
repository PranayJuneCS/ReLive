require 'unirest'
require 'json'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  @@client_id = "de0534bfebd644c6b8264da9c1cff6c6"
  @@client_secret = "52176792ef1e4cb98f13cdbab2689c2e"
  @@redirect_uri = "http://localhost:3000/login"

  def root
    @logged_in = session[:access_token]
    
    if @logged_in.nil?
      redirect_to "https://api.instagram.com/oauth/authorize/?client_id=" + @@client_id + "&redirect_uri=" + @@redirect_uri + "&response_type=code"
    else
      @string = "I'm logged in son: " + session[:access_token]
    end
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
      session[:access_token] = response.body["access_token"]
    end

    redirect_to action: "root" and return
  end

  def privacy
    render file: "privacypolicy.htm"
  end

  def new_image
    puts params[:url]
    response = Unirest.post "https://api.projectoxford.ai/vision/v1.0/describe",
                            headers: {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': '68c50c26771e49fe85f6640afd72ba9e'},
                            parameters: {'url': params[:url] }.to_json
    tags = response.body["description"]["tags"]
    captions = response.body["description"]["captions"]

    # TODO: need to create database schema, table, and add to relation

    render json: { "tags": tags, "captions": captions }
  end
end
