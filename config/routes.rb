Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  namespace :api do
    namespace :v1 do
      get 'stores', to: 'stores#index'
      get 'totalStores', to: 'stores#totalStores'
      get 'store/:id', to: 'stores#show'
      post 'create_store', to: 'stores#create'

    end
  end
  get '/*path' => 'homepage#index'

end
