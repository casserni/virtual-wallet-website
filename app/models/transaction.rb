class Transaction < ApplicationRecord
  validates :body, presence: true
  validates :wallet_id, presence: true, numericality: true

  belongs_to :wallet
end
