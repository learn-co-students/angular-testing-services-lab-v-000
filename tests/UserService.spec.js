describe('UserService', function () {

  beforeEach(module('app'));
 
  var UserService, $httpBackend;
 
  beforeEach(inject(function ($injector) {
      UserService = $injector.get('UserService');
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend.when('GET', '/rest/user').respond({user: 'Bill Gates', email: 'bill@microsoft.com'});
  }));

  it('should get the current users information', function (done) {
        $httpBackend.expectGET('/rest/user');

        UserService
          .getUser()
          .then(function (res) {
            if (res.data.email === 'bill@microsoft.com' && res.data.user === 'Bill Gates') {
              done();
            }
          });
 
        $httpBackend.flush();
  });

  it("should join user's first and last name", function () {
    expect(UserService.createFullName({first_name: 'Bill', last_name: 'Gates'})).toEqual('Bill Gates');
  });

});
