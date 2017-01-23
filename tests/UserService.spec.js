describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: 'Bill Gates', email: 'bill@microsoft.com'});
  }));

  it('should get the current users information', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res) {
        var data = res.data;
        if (data.email === 'bill@microsoft.com' && data.user === 'Bill Gates') {
          done();
        }
      });

      $httpBackend.flush();
  });

  it('should join the first and last name', function() {
    expect(UserService.createFullName({first_name: 'Ann', last_name: 'Lee'})).toBe('Ann Lee');
    // expect(UserService.createFullName({first_name: 'Ann', last_name: 'Lee'})).toEqual('Ann Lee');
  });
});