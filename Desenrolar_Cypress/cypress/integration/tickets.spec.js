describe("Tickets", () => {
  beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

  it("fills all the text input fields", () => {
      const firstName = "Valeria";
      const lastName = "Alves"; 

  cy.get("#first-name").type(firstName);
  cy.get("#last-name").type(lastName);
  cy.get("#email").type("valeriatest@gmail.com");
  cy.get("#requests").type("Mineira");
  cy.get("#signature").type('Valeria, Alves');
});

it("select two tickets", () => {
  cy.get("#ticket-quantity").select("2")
});

it("select 'vip' tickets type", () => {
  cy.get("#vip").check();
});

it("selects 'social media' checkbox", () => {
  cy.get("#social-media").check();
});

it("selects 'friend', and 'publication', then uncheck 'friend'", () => {
  cy.get("#friend").check();
  cy.get("#publication").check();
  cy.get("#friend").uncheck();
});
    it("has 'TICKETBOX' header's heading", () => {
      cy.get("header h1").should("contain", "TICKET");
    });


    it("alerts on invalid email", () => {
      cy.get("#email")
      .as("email")
      .type("valeriacypress-gmail.com");

      cy.get("#email.invalid").should("exist");

      cy.get("@email")
      .clear()
      .type("valeriacypress@gmail.com");

      cy.get("#email.touched").should("exist");
    });

    it("fills and reset the form", () => {
      const firstName = "Valeria";
      const lastName = "Alves";
      
   

      cy.get("#first-name").type(firstName);
      cy.get("#last-name").type(lastName);
      cy.get("#email").type("valeriatest@gmail.com");
      cy.get("#ticket-quantity").select("2");
      cy.get("#vip").check();
      cy.get("#friend").check();
      cy.get("#requests").type("Italian");

      cy.get(".agreement p").should(
        "contain", 
        'I, Valeria Alves, wish to buy 2 VIP tickets.'
        );

      cy.get("#agree").click();
      cy.get("#signature").type('Valeria, Alves');
      
      cy.get("button[type='submit']")
      .as("submitButton")
      .should("not.be.disabled");

      cy.get("button[type='reset']").click();
      cy.get("@submitButton").should("be.disabled");
    });

      it("fills mandatory fields using support command", () => {
        const customer = {
          firstName: "Valeria",
          lastName: "Alves",
          email: "valeriacurso@gmail.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled")
      });
    });
 