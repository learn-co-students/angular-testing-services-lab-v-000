describe('UserService', function () {
  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Jen', last_name: 'Anton', email: 'test@test.com'});
  }));

    it('should get the current users information', function(done) {
      $httpBackend.expectGET('/rest/user');
    
    UserService
      .getUser()
      .then(function(res) {
        var data = res.data;
        if (data.email === 'test@test.com' && data.first_name === 'Jen' && data.last_name === 'Anton') {
          done();
        }
      });
      $httpBackend.flush();
    });
    it('should join the first and last names', function() {
      expect(UserService.createFullName({first_name: 'Jen', last_name: 'Anton'})).toEqual('Jen Anton');
    });
});
