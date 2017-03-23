# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Day.destroy_all
ExchangeRate.destroy_all

date = (Time.now)
5.times do
  date = (date-1.day)
  date_ymd = date.strftime("%Y-%m-%d")
  day = Day.create(date: date_ymd)
  url = "https://api.fixer.io/#{date_ymd}?base=USD"
  uri = URI(url)
  response = Net::HTTP.get(uri)
  new_rates = JSON.parse(response)["rates"]
  ExchangeRate.create(symbol: "USD", rate: 1, day_id: day.id)
  new_rates.each_pair do |key, value|
    ExchangeRate.create(symbol: key, rate: value, day_id: day.id)
  end
end
