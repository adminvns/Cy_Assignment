// Generate random email and password for dynamic testing
const randomNum = Math.floor(Math.random() * 1000000);
const randomEmail = `johndoe${randomNum}@example.com`;
const randomPassword = `password${randomNum}`;


//Postive Test cases
describe('Verifying User Registration Form UI Validations', () => {
    it('Verify Valid User registration Process', () => {
        //Navigate to the website URL
        cy.visit(Cypress.config('baseUrl'))

        // Click on "Register" button
        cy.contains('Register').click()

        //Filling out registration form
        cy.get('#gender-male').check()
        cy.get('#FirstName').type('Shubham')
        cy.get('#LastName').type('Singh')
        cy.get('#Email').type(randomEmail)
        cy.get('#Password').type(randomPassword)
        cy.get('#ConfirmPassword').type(randomPassword)

        //Submiting the registration form
        cy.get('#register-button').click()
        //Validate the registration success message
        cy.get('.result').should('have.text', 'Your registration completed')
    });
});

describe('Verifying Login Method and Validations', () => {
    it('Verifying Login Functionality', () => {
        //Navigate to the website URL, PS--> we can also use the command file for custom login fucntion but here I am taking dynamic value via random function

        cy.visit(Cypress.config('baseUrl'))
        //Click on the login button
        cy.contains('Log in').click()

        //Fill the form with login information
        cy.get('#Email').type(randomEmail)
        cy.get('#Password').type(randomPassword)
        cy.get('*[class^="button-1 login-button"]').click()


        //Verify that the user is logged in successfully
        cy.get('.ico-account').should('have.text', 'My account')

    });
});



describe('Verifying Logout Method and Validations', () => {
    it('Verifying Logout Functionality', () => {
        //Navigate to the website URL
        cy.visit(Cypress.config('baseUrl'))


        cy.contains('Log in').click()

        //Perform login action with the input data
        cy.get('#Email').type(randomEmail)
        cy.get('#Password').type(randomPassword)
        cy.get('*[class^="button-1 login-button"]').click()


        //Verify the User has been logged in successfully
        cy.get('.ico-account').should('have.text', 'My account')
        //Click on the Logout link
        cy.contains('Log out').click();

        //Verify the User has been logged out successfully
        cy.get('.ico-register').should('have.text', 'Register')
        cy.get('.ico-login').should('have.text', 'Log in')
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Negative Test cases

describe('Verifying Invalid User data in Registration Method', () => {
    it('Verify Invalid values Error in User registration Form', () => {
        //Navigate to the website URL
        cy.visit(Cypress.config('baseUrl'))

        // Click on "Register" button
        cy.contains('Register').click()

        //Filling out registration form
        cy.get('#FirstName').type('Shubham')
        cy.get('#LastName').type('Singh')
        cy.get('[name="DateOfBirthDay"]').select('1')
        cy.get('[name="DateOfBirthMonth"]').select('January')
        cy.get('[name="DateOfBirthYear"]').select('1970')

        //intentionally giving wrong email address
        cy.get('#Email').type("abc1123###")
        cy.get('#Password').type(randomPassword)
        //intentionally giving wrong confirmation password
        cy.get('#ConfirmPassword').type(1231231231233)

        //Clicking on Submit Button 
        cy.get('#register-button').click()
        //Verifying the Error Message
        cy.get('#Email-error').should('be.visible')
        cy.get('#Email-error').should('have.text', 'Wrong email')
        //Verifying the Error Message
        cy.get('#ConfirmPassword-error').should('be.visible')
        cy.get('#ConfirmPassword-error').should('contain', 'password do not match')

    });
});



describe('Verifying Invalid Data in Login Page', () => {
    it('Verifying Error Messages on Login Page', () => {
        //Navigate to the website URL

        cy.visit(Cypress.config('baseUrl'));
        //Click on the login button
        cy.contains('Log in').click()

        //Fill the form with login information
        cy.get('#Email').type("abc1123###@shubhammail.com")
        cy.get('#Password').type(randomPassword)
        cy.get('*[class^="button-1 login-button"]').click()


        //Verifying the Error Message
        cy.get('.message-error').should('be.visible')
        cy.get('.message-error').should('contain', 'Login was unsuccessful')


    });
});

