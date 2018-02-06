describe('UserService', function () {
	beforeEach(module('app'));

	var UserService, $httpBackend;

	beforeEach(inject(function($injector){
		UserService = $injector.get('UserService');
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend.when('GET', '/rest/user').respond({
			user: 'Mendel',
			email: 'mendel@mendel.mendel'
		});
	}));

	it('Should get user data', function(done){
		$httpBackend.expectGET('/rest/user');

		UserService
			.getUser()
			.then(function(res){
				var data = res.data;
				if (data.user === 'Mendel' && data.email === 'mendel@mendel.mendel') {
					done();
				}
			});

			$httpBackend.flush();
	});	

	it('Should create full name from user obj', function() {
		var user = {first_name: 'Bernie', last_name: 'Sanders'};
		expect(UserService.createFullName(user)).toEqual('Bernie Sanders')
	});
});
