//Positive Test cases for API testing

describe("Verifying User via POST API", () => {
  // This Test case is to verify the creation of a new user with expected status code

  it("Verify on New user creation status sucess code", () => {
    // Load data from fixture
    cy.fixture("apiInput.json").then(({ name, job }) => {
      // Sending a POST request to create a new user
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: {
          name: name,
          job: job,
        },
      }).then((response) => {
        // Verifying the response status code is 201 (Created)
        expect(response.status).to.equal(201);
      });
    });
  });

  // This Test case is create for validating the expected response
  it("Verify New User is Created with expected Body in Response", () => {
    // Load data from fixture
    cy.fixture("apiInput.json").then(({ name, job }) => {
      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users",
        body: {
          name: name,
          job: job,
        },
      }).then((response) => {
        // Verifying the user's name and job in the response body
        expect(response.body).to.have.property("name", name);
        expect(response.body).to.have.property("job", job);
      });
    });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Negative Test cases (PLEASE NOTE: FIRST TWO  TEST CASES WILL "ALWAYS FAIL" , AS DEVELOPER HAS NOT HANDLE THE EMPTY AND INVALID INPUTS)

describe("Verifying negative POST API test cases", () => {
  // This Test case is to verify that the API should throw 400 code on sending empty data
  it("Verify Empty Body Handling ", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "",
        job: "",
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });
  // This Test case is to verify that the API should throw 400 code in incorrect body
  it("Verifying Invalid Body ", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: "",
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });

  // This Test case is to verify invalid Endpoint
  it("Verifying Invalid Endpint ", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/123123",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
});
