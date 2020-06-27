class Api::V1::StoresController < ApplicationController
    def index
        stores = Store.all
        render json: stores
    end

    def show
        if find_store
            render json: find_store
        else
            p find_store.errors
            render json: find_store.errors
        end
    end
    
    private

    def find_store
        @store = Store.find(params[:id])    
    end
    
end
