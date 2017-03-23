class CreateExchangeRates < ActiveRecord::Migration[5.0]
  def change
    create_table :exchange_rates do |t|
      t.string :symbol, null: false
      t.float :rate, null: false
      t.integer :day_id, null: false
    end
  end
end
