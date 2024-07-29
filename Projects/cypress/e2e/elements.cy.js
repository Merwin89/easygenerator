import PageElements from "../pages/pageElements";

describe("Dropdown Tests", () => {
  beforeEach(() => {
    cy.visit("/task.html");
  });

  it("should check if legend element is visible", () => {
    cy.get(PageElements.legend).should("be.visible");
  });

  it("should have the legend element", () => {
    cy.get(PageElements.legend).should("exist");
  });

  it("should select Option1 from the dropdown", () => {
    PageElements.selectOption("option1");
    PageElements.verifySelectedOption("option1");
  });

  it("should select Option2 from the dropdown", () => {
    PageElements.selectOption("option2");
    PageElements.verifySelectedOption("option2");
  });

  it("should select Option3 from the dropdown", () => {
    PageElements.selectOption("option3");
    PageElements.verifySelectedOption("option3");
  });

  it("should have the correct number of options in the dropdown", () => {
    PageElements.dropdown.children().should("have.length", 3);
  });

  it("should display the correct header text", () => {
    PageElements.verifyHeaderText("Upload your image here");
  });

  it("should have the header element visible", () => {
    cy.get(PageElements.header).should("be.visible");
  });

  it("should have the header element with correct tag", () => {
    cy.get(PageElements.header)
      .should("have.prop", "tagName")
      .and("equal", "H3");
  });

  it("should upload an image and display it", () => {
    cy.fixture("download.jpeg", "base64").then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent,
        fileName: "example-image.jpg",
        mimeType: "image/jpeg",
      });
    });
  });

  it("should open a new tab when clicked", () => {
    //Tried this by manipulating the target as well as onClick attrributes but wasn't successful
    PageElements.clickOpenTab();
    cy.url().should("eq", "https://www.easygenerator.com/en/");
  });

  it("should type a name in the input field", () => {
    const name = "John Doe";
    PageElements.typeName(name);
    cy.get(PageElements.nameInput).should("have.value", name);
  });

  it("should display an alert when the alert button is clicked", () => {
    PageElements.clickAlertButton();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal(
        "Hello , share this practice page and share your knowledge"
      );
    });
  });

  it("should display a confirmation dialog when the confirm button is clicked", () => {
    PageElements.clickConfirmButton();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Hello , Are you sure you want to confirm?");
    });
  });

  it("should read file, input text, and show alert", () => {
    cy.task("readAlertFile").then((fileContent) => {
      PageElements.typeName(fileContent);

      PageElements.clickAlertButton();

      cy.on("window:alert", (alertText) => {
        expect(alertText).to.contain(fileContent);
      });
    });
  });

  it('Verify that clicking the "Hide" button successfully hides the input field.', () => {
    PageElements.showButton.click();
    PageElements.hideButton.click();
    PageElements.inputField.should("not.be.visible");
  });

  it('Verify that clicking the "Show" button successfully reveals the input field after it has been hidden.', () => {
    PageElements.hideButton.click();
    PageElements.showButton.click();
    PageElements.inputField.should("be.visible");
  });

  it("Ensure that the input field accepts text input when visible and functions as expected.", () => {
    PageElements.showButton.click();
    PageElements.inputField
      .type("Test input")
      .should("have.value", "Test input");
  });

  it('Attempt to click the "Hide" button when the input field is already hidden, and verify that no errors occur.', () => {
    PageElements.hideButton.click();
    PageElements.hideButton.click();
  });

  it('Try to click the "Show" button when the input field is visible and ensure that it does not lead to any unexpected behavior.', () => {
    PageElements.showButton.click();
    PageElements.inputField.should("be.visible");
  });

  it("should display hover content on mouseover", () => {
    PageElements.hoverOverContent();
    //PageElements.hoverContent.should("have.class", "hover-content hovered");
  });

  it("should navigate to the top link when clicked", () => {
    cy.get(".hover-container").trigger("mouseover");
    cy.get(".hover-content").should("be.visible");
    cy.get('.hover-content a[href="#top"]').click();
    cy.url().should("include", "http://localhost:8080/task.html#top");
  });

  it("should navigate to the reload link when clicked", () => {
    cy.get(".hover-container").trigger("mouseover");
    cy.get(".hover-content").should("be.visible");
    cy.get('.hover-content a[href=""]').click();
    cy.url().should("include", "http://localhost:8080/task.html");
  });

  it("should hide hover content when mouse leaves", () => {
    cy.get(".hover-container").trigger("mouseover");
    cy.get(".hover-content").should("be.visible");
    cy.get("body").trigger("mouseout");
    cy.get(".hover-content").should("not.be.visible");
  });

  it.only("should access the iframe", () => {
    cy.get("#courses-iframe").should("be.visible").then(cy.wrap);
  });
});
