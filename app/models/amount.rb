class Amount < ApplicationRecord
  validates :quantity, presence: true, numericality: true
  validates :symbol, presence: true
  validates :wallet_id, presence: true
  belongs_to :wallet
end
