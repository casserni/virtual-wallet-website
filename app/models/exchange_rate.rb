class ExchangeRate < ApplicationRecord
  validates :symbol, presence: true
  validates :rate, presence: true
  validates :day_id, presence: true, numericality: true
  belongs_to :day
end
