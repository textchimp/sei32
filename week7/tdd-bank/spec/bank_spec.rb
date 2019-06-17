
require_relative '../lib/bank'  # this is the app code we are actually testing

describe Bank do

  # This code will run before every example (every 'it'
  # block), guaranteeing that we have an instance of
  # the Bank class available to test, in a variable
  # called 'bank'
  # i.e. We have extracted the 'Arrange/Act' step from the
  # example blocks, making them DRYer
  let( :bank ){  Bank.new 'GA Bank'  }

  describe '.new' do
    # This is the test for making sure that we can create a new
    # instance of our Bank class, using Bank.new()


    it 'creates a new Bank object' do
      # Assert: do our expectations match the reality?
      expect( bank ).to_not be nil
      expect( bank ).to be_a Bank
    end

    it 'assigns a name to the bank' do
      # Assert:
      expect( bank.name ).to eq 'GA Bank'
    end

  end  # .new


  describe '#create_account' do

    it 'creates an account for some specific person' do

      # Arrange/act: set up the thing we want to test
      bank.create_account( 'Craigsy', 200 )

      # Assert: is the output what we expect?
      expect( bank.accounts['Craigsy'] ).to eq 200
    end

    it 'creates an account with a zero balance when no starting balance is specified' do

      bank.create_account( 'Craigsy' )
      expect( bank.accounts['Craigsy'] ).to eq 0
    end

  end #  #create_account


  describe '#deposit' do

    it 'deposits the correct amount into the specified account' do
      # Arrange
      bank.create_account( 'Craigsy', 100 )

      # Act
      bank.deposit( 'Craigsy', 200 )

      # Assert
      expect( bank.accounts['Craigsy'] ).to eq 300

    end

  end # #deposit


  describe '#withdraw' do

    it 'withdraws the correct amount from the specified account' do
      bank.create_account( 'Jonesy', 100 )
      bank.withdraw( 'Jonesy', 50 )
      expect( bank.accounts['Jonesy'] ).to eq 50
    end

    it 'ignores withdrawals that exceed the account balance' do
      bank.create_account( 'Jonesy', 100 )
      bank.withdraw( 'Jonesy', 200 )
      expect( bank.accounts['Jonesy'] ).to eq 100
    end

  end #  #withdraw

  describe '#balance' do

    it 'returns the account balance for the specified account' do
      bank.create_account( 'Mad Kimmy', 500 )
      expect( bank.balance('Mad Kimmy') ).to eq 500
    end

  end



end  # Bank
