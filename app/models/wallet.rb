class Wallet < ApplicationRecord
  validates :name, presence: true
  validates :base, presence: true
  validates :user_id, presence: true, numericality: true


  belongs_to :user
  has_many :amounts
  has_many :transactions
end
