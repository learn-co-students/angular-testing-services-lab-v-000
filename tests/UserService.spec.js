describe('UserService', function () {
    beforeEach(module('app'));
 
    var UserService, $httpBackend;
 
    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');
 
        $httpBackend.when('GET', '/rest/user').respond({first_name: 'Edgar', last_name: 'Gonzalez', email: 'example@example.com'});
    }));
 
    it('should get the current users information', function (done) {
        $httpBackend.expectGET('/rest/user');
 
        UserService
          .getUser()
          .then(function (response) {
            if (response.data.email === 'example@example.com' && response.data.first_name === 'Edgar' && response.data.last_name === 'Gonzalez') {
              done();
             } //else {
            // 	console.log(response);
            // 	// Object{data: Object{first_name: 'Edgar', last_name: 'Gonzalez', email: 'example@example.com'}
            // }
          });
 
        $httpBackend.flush();
    });

	it('should add names together correctly', function () {
		var user = {first_name: 'Edgar', last_name: 'Ed'};
		expect(UserService.createFullName(user)).toEqual('Edgar Ed');
	});
});

