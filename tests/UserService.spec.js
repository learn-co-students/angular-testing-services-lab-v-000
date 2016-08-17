describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({
      first_name: 'Bill', last_name: 'Gates'
    });
  }));

  it('should get the current user information', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res) {
        var data = res.data;
        if(data.first_name === 'Bill' && data.last_name === 'Gates') {
          done();
        }
      });

      $httpBackend.flush();
  });

  it ('should join the user first name and last name together', function() {
    expect(UserService.createFullName({first_name: 'Bill', last_name: 'Gates'})).toEqual('Bill Gates');
  });

});