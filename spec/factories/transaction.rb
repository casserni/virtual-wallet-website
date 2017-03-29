FactoryGirl.define do
  factory :transaction, class: Transaction do
    sequence(:body) { |n| "Symbol#{n} traded to Symbol#{n +1 }" }
  end
end
