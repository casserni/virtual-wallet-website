class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.text :body, null: false
      t.integer :wallet_id, null: false

      t.timestamps
    end
  end
end
