Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'application#root'
  get '/login', to: 'application#login'
  get '/privacy', to: 'application#privacy'
  get '/photos', to: 'application#get_photos'
  post '/photo/new', to: 'application#new_photo'
  post '/photo/update', to: 'application#update_photo'
end
