describe('UserService', function () {
  beforeEach(module('app'));
  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: "Bill", last_name: "Gates"});
  }));

  it('should get the correct login info', function() {
    $httpBackend.expectGET('/rest/user');
    UserService
      .getUser()
      .then(function(res) {
      if (res.first_name === "Bill", res.last_name === "Gates"){
        done();
      };
    });
    $httpBackend.flush();
  });

  it('should create the full name', function () {
    expect(UserService.createFullName({first_name: 'Bill', last_name: 'Gates'})).toEqual('Bill Gates');
  });
});
