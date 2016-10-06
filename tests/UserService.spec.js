describe('UserService', function () {
    beforeEach(module('app'));
 
    var UserService, $httpBackend;
 
    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');
 
        $httpBackend.when('GET', '/rest/user').respond({user: 'Bill Gates', email: 'bill@microsoft.com'});
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
        $httpBackend.flush();
    });


    it('should return the full name', function(){
      expect(UserService.createFullName({first_name: "Andrew", last_name: "P"})).toEqual("Andrew P")
    })
});