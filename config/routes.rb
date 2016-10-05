Rails.application.routes.draw do
 
  root 'dashboard#index'

  namespace :api do
	resources :records, only: [:index, :create, :update, :destroy] do
	  get :search, on: :collection
	end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
