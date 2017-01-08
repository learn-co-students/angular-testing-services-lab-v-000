describe(`UserService`, () => {
  beforeEach(module(`app`));

  let OurService
  beforeEach(inject($injector => {
    UserService = $injector.get(`UserService`)

    $httpBackend = $injector.get(`$httpBackend`)
    $httpBackend.when(`GET`, `/rest/user`)
      .respond({ first_name: `Dennis`, last_name: `Ritchie` })
  }))

  it(`should return the current user's information`, done => {
    $httpBackend.expectGET(`/rest/user`)

    UserService.getUser()
      .then(response => {
        const { data } = response
        if (data.first_name === `Dennis` && data.last_name === `Ritchie`) {
          done()
        }
      })

    $httpBackend.flush()
  })

  it(`should update the current user's information`, () => {
    const newUser = { first_name: `Brian`, last_name: `Kernighan` }
    expect(UserService.createFullName(newUser)).toEqual(`Brian Kernighan`)
  })
})
