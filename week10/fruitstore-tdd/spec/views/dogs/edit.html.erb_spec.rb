require 'rails_helper'

RSpec.describe "dogs/edit", type: :view do
  before(:each) do
    @dog = assign(:dog, Dog.create!(
      :name => "MyString",
      :roundness => 1,
      :good_boy => false
    ))
  end

  it "renders the edit dog form" do
    render

    assert_select "form[action=?][method=?]", dog_path(@dog), "post" do

      assert_select "input[name=?]", "dog[name]"

      assert_select "input[name=?]", "dog[roundness]"

      assert_select "input[name=?]", "dog[good_boy]"
    end
  end
end
