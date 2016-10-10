Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'application#root'
  get '/login', to: 'application#login'
  get '/privacy', to: 'application#privacy'
  post '/image/new', to: 'application#new_image'
end
