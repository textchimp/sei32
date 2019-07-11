require 'rails_helper'

RSpec.describe Fruit, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  it { should belong_to(:shelf) }

  describe 'A Pear' do

    before do
      @shelf = Shelf.create name: 'watevz'
      @pear = Pear.create name: 'Nashi', shelf: @shelf
    end

    it 'should create a valid fruit object' do
      # set up test
      pear_retrieved = Pear.find @pear.id

      expect( @pear ).to_not be_nil
      expect( pear_retrieved ).to eq @pear
    end

    it 'should remember its name' do
      expect( @pear.name ).to eq 'Nashi'
    end

    it 'should remember its class via Single Table Inheritance' do
      pear_retrieved = Fruit.find @pear.id

      expect( pear_retrieved.class ).to eq Pear
      expect( pear_retrieved ).to be_a Pear

      expect( pear_retrieved.is_a? Fruit ).to eq true
      expect( pear_retrieved ).to be_a Fruit

      expect( pear_retrieved.class.ancestors ).to include Fruit
    end

    it 'should be kind of squishy' do
      expect( @pear.squishy? ).to eq true
    end

    # Test validations of a model:

    it 'should be valid' do
      expect( @pear ).to be_valid  # i.e. no validation errors
    end

    it 'should validate the uniqueness of the name' do
      pear_duplicate = Pear.create name: 'Nashi'
      expect( pear_duplicate ).to_not be_valid
    end



  end

end
