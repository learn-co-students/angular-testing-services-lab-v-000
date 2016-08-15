describe('UserService', function () {
   beforeEach(module('app'));

   var UserService, $httpBackend;

    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');
 
        $httpBackend.when('GET', '/rest/user').respond({user: 'Peter Jacobson', email: 'peter.jacobson@gmail.com'});
    }));


    it('should get the current users information', function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var data = res.data;
        if (data.email === 'bill@microsoft.com' && data.first_name === 'Bill') {
          done();
        }
      });

    $httpBackend.flush();
  });

  it('should add names together correctly', function () {
    expect(UserService.createFullName({first_name: 'Test', last_name: 'Test'})).toEqual('Test Test');
  });

});


