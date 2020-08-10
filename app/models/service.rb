class Service < ApplicationRecord
    belongs_to :store
    # validates_presence_of :store_id, on: :create, message: "can't be blank"
end
