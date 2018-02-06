describe('UserService', function () {
  var $controller;

  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates' })
  }));

  it ('should get the users information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService.getUser()
      .then(function(response) {
        var data = response.data;
        if (data.first_name === 'Bill' && data.last_name === 'Gates') {
          done();
        }
      });
    $httpBackend.flush();
  });

  it ('should create a full name', function() {
    expect(UserService.createFullName({first_name: 'Bill', last_name: 'Gates'})).toEqual('Bill Gates');
  });
});
