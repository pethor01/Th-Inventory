class Api::V1::StoresController < ApplicationController
    def index
        stores = Store.all.order('created_at desc')
        render json: stores
    end

    def create
        store = Store.create(store_params)
        if store
            render json: store
        else
            render json: store.errors
        end
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

    def store_params
        params.permit(:name, :address, :contact_no)   
    end
    
    def find_store
        @store = Store.find(params[:id])    
    end
    
end
