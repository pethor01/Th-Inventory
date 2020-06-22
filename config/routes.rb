Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#index'
  namespace :api do
    namespace :v1 do
      get 'stores', to: 'stores#index'
    end
  end
  get '/*path' => 'homepage#index'

end
