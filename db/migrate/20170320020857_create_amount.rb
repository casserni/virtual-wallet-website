class CreateAmount < ActiveRecord::Migration[5.0]
  def change
    create_table :amounts do |t|
      t.string :symbol, null: false
      t.float :quantity, default: 0
      t.integer :wallet_id, null: false
    end
  end
end
