class Store < ApplicationRecord

    def self.test_drive
        p "awtss"
    end
    
    def self.create_stores
        store_names = ["TH-Alabang", "TH-FTI", "TH-Riverbanks"]
        address = ["Alabang", "FTI Taguig City", "Riverbank Marikina"]
        contact_no = ["87000", "87900", "90888"]

        store_names.each_with_index do |store, index|
            Store.create(name: store, address: address[index], contact_no: contact_no[index].to_i)
            p store
            p index
        end 
    end
end
