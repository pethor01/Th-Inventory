class Api::V1::StoresController < ApplicationController
    def index
        total_stores = Store.all.length
        page = params[:page]
        stores = Store.order('created_at desc').page(page).per(12)
        render json: {stores: stores, total_stores: total_stores}
    end

    def create
        store = Store.create(store_params)
        if store
            render json: store
        else
            render json: store.errors
        end
    end

    def update
        if find_store
            @store.update(store_params)
            render json: @store 
        else
            p find_store.errors
            render json: find_store.errors
        end                 
    end
    
    def delete
        if find_store
            @store.delete
        else
            p find_store.errors
            render json: find_store.errors
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
        params.require(:store).permit(:name, :address, :contact_no)   
    end
    
    def find_store
        @store = Store.find(params[:id])    
    end
    
end
