Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'application#landing'
  get '/root', to: 'application#root'
  get '/landing', to: 'application#landing'
  get '/login', to: 'application#login'
  get '/privacy', to: 'application#privacy'
  get '/photos', to: 'application#get_photos'
  get '/card', to: 'application#card'
  post '/photo/new', to: 'application#new_photo'
  post '/user/update_location', to: 'application#update_location'
  post '/photo/update', to: 'application#update_photo'
end
