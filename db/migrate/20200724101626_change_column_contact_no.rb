class ChangeColumnContactNo < ActiveRecord::Migration[6.0]
  def change
    change_column :stores, :contact_no, :string
  end
end
