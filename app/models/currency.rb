class Currency < ApplicationRecord
  belongs_to :day
  has_many :exchange_rates
end
