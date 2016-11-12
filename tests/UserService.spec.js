describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({name: 'Auran Buckles', email: 'auran@microsoft.com'});
  }));

  it('should get the current users logged in information', function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
      	var data = res.data;
        if (data.name === 'Auran Buckles' && data.email === 'auran@microsoft.com') {
          done();
        }
      });

    $httpBackend.flush();
  });

  it('should return the full name', function() {
    expect(UserService.createFullName({first_name: 'Auran', last_name: 'Buckles'})).toEqual("Auran Buckles")
  })
});

// In this repo we have a service named UserService that has two functions.
// The first function is to get the user's logged in information from /rest/user. Test this method using $httpBackend to mock the response (you can mock any response, just make sure to test for the same response that you mock!)
// The second function is to join the user's first name with their last name, with a space in between. Test that this function returns the expected output.
