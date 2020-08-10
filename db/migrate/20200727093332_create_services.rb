class CreateServices < ActiveRecord::Migration[6.0]
  def change
    create_table :services do |t|
      t.references :store
      t.string :service_type      
      t.date :service_date
      t.time :time_in
      t.time :time_out
      t.text :description
      t.decimal :amount, precision: 20, scale: 2
      t.timestamps
    end
  end
end
