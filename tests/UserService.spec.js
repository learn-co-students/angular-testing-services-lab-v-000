describe('UserService', function () {
  beforeEach(module('app'));

    var UserService, $httpBackend;

    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', '/rest/user').respond({user: 'Bill Gates', first_name:'Bill', last_name: 'Gates', email: 'bill@microsoft.com'});
    }));

    it('should get the current users information', function () {
        $httpBackend.expectGET('/rest/user');

        UserService
          .getUser()
          .then(function (res) {
            if (res.email === 'bill@microsoft.com' && res.user === 'Bill Gates') {
              done();
            }
          });


    });

    it('should add names ', function () {
    expect(UserService.createFullName({first_name: 'Bill', last_name: 'Gates'})).toEqual('Bill Gates');
    });

});
