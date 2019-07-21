const Request = require('request');

describe('Server', () => {

  // it('works at all', () => {
  //   console.log('Spec file loaded!');
  //   expect( true ).toBe( true );
  // });

  let server;
  beforeAll( done => {
    server = require('../server');
    done();  // Safe to continue running the tests

    // TODO: Insert some documents into the test version of the MongoDB
    // database here, instead of relying on the live DB

  });

  afterAll( () => {
    server.close(); // shut down the server when we're finished testing
  });


  describe('GET /', () => {

    const response = {};

    beforeAll( done => {
      Request.get('http://localhost:3333/', (error, res, body) => {
        // console.log('response:', res.body);
        response.status = res.statusCode;
        response.body = body;
        done(); // proceed with the actual testing
      });

    });

    it('returns an HTTP status 200 success', () => {
      expect( response.status ).toBe( 200 );
    });

    it('returns the correct body content', () => {
      expect( response.body ).toBe( 'Hello world!' );
    });

  }); // GET /


  describe('GET /flights', () => {

    const response = {};

    beforeAll( done => {
      Request.get('http://localhost:3333/flights', (error, res, body) => {
        // console.log('response:', res.body);
        response.status = res.statusCode;
        response.body = body;
        response.data = JSON.parse( body );
        done(); // proceed with the actual testing
      });
    });

    it('returns an HTTP status 200 success', () => {
      expect( response.status ).toBe( 200 );
    });


    it('returns a valid JSON object with the correct number of flights', () => {
        // TODO: use a test version of the DB instead of relying on
        // the current state of the dev/production DB
        expect( response.data.length ).toBe( 3 );
    });

    it('returns the correct list of flights', () => {
      expect( response.data[0].flight_number ).toBe('123');
    });


  }); // GET /flights


});
