class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def privacy
  	render file: "privacypolicy.htm"
  end
end
