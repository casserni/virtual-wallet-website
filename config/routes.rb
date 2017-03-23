Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  resources :home

  namespace :api do
    namespace :v1 do
      resources :days, only: [:index] do
        resources :exchange_rates, only: [:index]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [] do
        resources :wallets
      end
    end
  end

end
