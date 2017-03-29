require 'rails_helper'

RSpec.describe Amount, type: :model do
  it { should have_valid(:quantity).when(1, 1.0, "1") }
  it { should_not have_valid(:quantity).when(nil, 'string', "") }

  it { should have_valid(:symbol).when("symbol") }
  it { should_not have_valid(:symbol).when(nil, "") }

  it { should have_valid(:wallet_id).when(1) }
  it { should_not have_valid(:wallet_id).when(nil, "") }
end
