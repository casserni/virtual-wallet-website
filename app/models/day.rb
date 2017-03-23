class Day < ApplicationRecord
  validates :date, presence: true
  has_many :exchange_rates
end
