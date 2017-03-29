require 'rails_helper'

RSpec.describe Wallet, type: :model do
  it { should have_valid(:name).when("string") }
  it { should_not have_valid(:name).when(nil, "") }

  it { should have_valid(:base).when("string") }
  it { should_not have_valid(:base).when(nil, "") }

  it { should have_valid(:user_id).when(1) }
  it { should_not have_valid(:user_id).when(nil, "", "string") }

end
