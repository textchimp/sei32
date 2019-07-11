require 'rails_helper'

RSpec.describe FruitsController, type: :controller do


  describe "GET #index" do

    before do
      @shelf = Shelf.create name: 'a shelf'
      3.times{ |i| Fruit.create name: "Fruit number #{i}", shelf: @shelf  }
    end

    describe "GET #index in HTML format" do

      before do
        get :index
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it 'renders the index template' do
        expect( response ).to render_template(:index)
      end

      it 'assigns the instance variable @fruits which contains all the fruits' do
          expect( assigns(:fruits) ).to be
          expect( assigns(:fruits).length ).to eq 3
          expect( assigns(:fruits).first ).to be_a Fruit
      end

      it 'assigns to @fruits the fruits from the DB in reverse order' do
        expect( assigns(:fruits).first.name ).to eq 'Fruit number 2'
      end

    end #  'GET #index in HTML'



    describe 'GET #index in JSON format' do

      before do
        # xhr :index
        get :index, format: 'json'
      end

      it 'returns HTTP success' do
        expect( response ).to have_http_status(:success)
      end

      it 'provides the name of the fruits in the JSON response' do
        fruits = JSON.parse( response.body )
        expect( fruits.length ).to eq 3
        expect( fruits.first['name'] ).to eq 'Fruit number 2'
      end

    end # 'GET #index in JSON'

  end # Get #index


  describe 'POST to #create' do

    describe 'a fruit with valid information' do

      before do
        post :create, params: {
          fruit: {
            name: 'Strawberry',
            shelf_id: Shelf.create(name: 'shelf').id
          }
        }
      end

      it 'increases the number of fruits in the database by 1' do
        expect( Fruit.all.length ).to eq 1
      end

      it 'saves the correct fruit name from the form to the DB' do
        expect( Fruit.first.name ).to eq 'Strawberry'
      end

      it 'redirects to the show action for this fruit' do
        expect( response ).to redirect_to( Fruit.first )
        # You can actually write in a controller:
        #   redirect_to Fruit.first
        # and this is interpreted as
        #   redirect_to fruit_path( Fruit.first.id )
        # which means something like
        #   redirect_to '/fruits/1'
      end

    end # valid fruit


    describe 'a fruit with invalid information' do

      before do
        post :create, params: {
          fruit: {
            name: '',
            shelf_id: Shelf.create(name: 'shelf').id
          }
        }
      end

      it 'does not increase the number of fruits in the DB' do
        expect( Fruit.all.length ).to eq 0
      end

      it 'renders the #new template' do
        expect( response ).to render_template( :new )
      end

    end # invalid fruit


  end  # POST to #create


end
