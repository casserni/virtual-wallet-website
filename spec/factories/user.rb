FactoryGirl.define do
  factory :user, class: User do
    sequence(:email) { |n| "person#{n}@example.com" }
    password "password"
    password_confirmation "password"
  end
  
  factory :exchange_rate, class: ExchangeRate do
    sequence(:symbol) { |n| "symbol#{n}" }
    sequence(:rate) { |n| "#{n}" }
  end
end
