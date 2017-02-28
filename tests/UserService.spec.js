describe('UserService', function () {

	beforeEach(module('app'));

	var UserService, $httpBackend;

	beforeEach(inject( function($injector){
		UserService = $injector.get('UserService');
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates'});
	}));

	it('Should get the user first and last names', function(done) {
		$httpBackend.expectGET('/rest/user');

		UserService
			.getUser()
			.then(function(res){
				var user = res.data;
				if (user.first_name === 'Bill' && user.last_name === 'Gates') {
					done();
				}
			});

		$httpBackend.flush();	
	});

	it('should add name and last name together', function(){
		var user = {first_name: 'Bill', last_name: 'Gates'};
		expect(UserService.createFullName(user)).toEqual('Bill Gates');
	});
});
