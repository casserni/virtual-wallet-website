Rails.application.routes.draw do
  root 'home#index'

  resources :home
  
  namespace :api do
    namespace :v1 do
      resources :currencies
    end
  end
end
