require 'rails_helper'

RSpec.describe ExchangeRate, type: :model do
  it { should have_valid(:symbol).when("symbol") }
  it { should_not have_valid(:symbol).when(nil, "") }

  it { should have_valid(:rate).when(1.0) }
  it { should_not have_valid(:rate).when(nil, "", "string") }

  it { should have_valid(:day_id).when(1) }
  it { should_not have_valid(:day_id).when(nil, "", "string") }
end
