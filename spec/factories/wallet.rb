FactoryGirl.define do
  factory :wallet, class: Wallet do
    sequence(:name) { |n| "name#{n}" }
    sequence(:base) { |n| "base#{n}" }
  end
end
