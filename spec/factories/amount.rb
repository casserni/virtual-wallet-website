FactoryGirl.define do
  factory :amount, class: Amount do
    sequence(:symbol) { |n| "Symbol#{n}" }
    sequence(:quantity) { |n| n }
  end
end
