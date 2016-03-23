describe('UserService', function () {
  // creates $controller Mock service, and UserService
  var $controller, UserService;
  // generates the 'app' module
  beforeEach(module('app'));

  beforeEach(inject(function($injector) {
    // defines $httpBackend when requiring 'UserService'
    UserService = $injector.get('UserService');
    // sets-up a mock $httpBackend for API testing
    $httpBackend = $injector.get('$httpBackend');
    // sets the response for the GET call
    $httpBackend.when('GET', '/rest/user')
        .respond({first_name: 'Like a ', last_name: 'Boss', email: 'getthings@done.com'});
  }));

  it('should get the users logged-in information', function() {
    // indecation to ng that get should occurr
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(response) {
        expect(response.data.first_name).toEqual('Like a ');
        expect(response.data.last_name).toEqual('Boss');
        expect(response.data.email).toEqual('getthings@done.com');
      });
      // set-off calls in a controlled fashion to prevent timeouts
      $httpBackend.flush();
  });

  it('it joins the first and last name with createFullName', function() {
    expect(UserService.createFullName({first_name: 'Like a', last_name: 'Boss'})).toEqual('Like a Boss');
  });
});
