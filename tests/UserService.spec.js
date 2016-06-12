describe('UserService', function () {
    var $controller;
 
   beforeEach(module('app'));
 
   var UserService;
 
   beforeEach(inject(function ($injector) {
       UserService = $injector.get('UserService');
       $httpBackend = $injector.get('$httpBackend');
 
       $httpBackend.when('GET', '/rest/user').respond({first_name: 'George', last_name: 'Washington', email: 'george@liberty.com'});
   }));
 
   it('should get the current users information', function (done) {
       $httpBackend.expectGET('/rest/user');
 
       UserService
         .getUser()
         .then(function (res) {
          var data = res.data;
           if (data.email === 'george@liberty.com' && data.first_name === 'George') {
             done();
           }
         });
 
       $httpBackend.flush();
   });
   it('should add names together with space between', function () {
    expect(UserService.createFullName({first_name: 'Albert', last_name: 'Einstein'})).toEqual('Albert Einstein');
  });
});
