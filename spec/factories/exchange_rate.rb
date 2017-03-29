FactoryGirl.define do
  factory :exchange_rate, class: ExchangeRate do
    sequence(:symbol) { |n| "symbol#{n}" }
    sequence(:rate) { |n| "#{n}" }
  end
end
