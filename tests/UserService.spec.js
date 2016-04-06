describe('UserService', function () {
  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Adam', last_name: 'King', email: 'adam.king0126@gmail.com'});
  }));

  it('should get the current users information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (result) {
        var data = result;
        if (data.email === 'adam.king0126@gmail.com' && data.first_name === 'Adam' && data.last_name === 'King'){
          done();
        }
      });

    $httpBackend.flush();
  });


  it('should create a full name', function () {
    expect(UserService.createFullName({first_name: 'Adam', last_name: 'King'})).toEqual('Adam King');
  });

});
