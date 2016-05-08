describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({
      user: 'Brian Menard', email: 'brian@webdevbrian.com'});
  }));

  it('should get the current users information', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(response){
        var data = response.data;
        if (data.user == 'Brian Menard' && data.email == 'brian@webdevbrian.com')
      {
        done();
      }
  });
  $httpBackend.flush();
});

it('should add names together correctly', function () {
  expect(UserService.createFullName({first_name: 'Test', last_name: 'Test'})).toEqual('Test Test');
});

});
