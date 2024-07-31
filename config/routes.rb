Rails.application.routes.draw do
  # Define routes for the admin namespace
  namespace :admin do
    resources :orders
    resources :products do
      resources :stocks
    end
    resources :categories
  end
  # Define routes for Devise and user authentication
  devise_for :users, controllers: { registrations: 'users/registrations' }
  root "home#index"
  # Define additional routes for public access
  get "up" => "rails/health#show", as: :rails_health_check 
  get "admin" => "admin#index", as: :admin_root
  get "cart" => "carts#show"
  post "checkout" => "checkouts#create"
  get "success" => "checkouts#success"
  get "cancel" => "checkouts#cancel"
  get "*path", to: "home#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  # Define routes for categories and products
  resources :categories, only: [:show]
  resources :products, only: [:show]
  # Define the default root route for non-authenticated users
end
