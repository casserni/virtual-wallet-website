class CreateWallet < ActiveRecord::Migration[5.0]
  def change
    create_table :wallets do |t|
      t.string :name, null: false
      t.string :base, null: false
      t.integer :user_id, null: false
    end
  end
end
