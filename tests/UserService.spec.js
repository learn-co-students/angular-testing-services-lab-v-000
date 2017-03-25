describe('UserService', function () {
	beforeEach(module('app'));

	var UserService, $httpBackend;

	beforeEach(inject(function($injector){
		UserService = $injector.get('UserService')
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.when('GET', '/rest/user')
			.respond({user: "Garfield", favorite_food: "Lasagna"})
	}))

	it('should create a full name', function(){
		expect(UserService.createFullName({first_name: "Jonathan", last_name: "Foster"})).toEqual("Jonathan Foster")
	})

	it('should get the current users info', function(done) {
		$httpBackend.expectGET('/rest/user');

		UserService
			.getUser()
			.then(function(res){
				var data = res.data;
				if(data.user === "Garfield" && data.favorite_food === "Lasagna") {
					done();
				}
			})
			$httpBackend.flush();
	})
});
