class PageElements {
  get legend() {
    return "legend";
  }

  get dropdown() {
    return cy.get('select[name="dropdown-class-example"]');
  }

  get header() {
    return "h3";
  }

  get fileInput() {
    return cy.get('.input[type="file"]');
  }

  get openTabButton() {
    return "#opentab";
  }

  get nameInput() {
    return "#name";
  }

  get alertButton() {
    return "#alertbtn";
  }

  get confirmButton() {
    return "#confirmbtn";
  }

  get hideButton() {
    return cy.get("#hide-textbox");
  }

  get showButton() {
    return cy.get("#show-textbox");
  }

  get inputField() {
    return cy.get("#displayed-text");
  }

  get hoverContent() {
    return cy.get(".hover-container > .btn");
  }

  get topLink() {
    return this.hoverContent.find("a").eq("0");
  }

  get reloadLink() {
    return this.hoverContent.find("a").eq(1);
  }

  hoverOverContent() {
    this.hoverContent.trigger("mouseover");
  }

  clickTopLink() {
    this.topLink.click();
  }

  clickReloadLink() {
    this.reloadLink.click();
  }

  assertLegendText(expectedText) {
    cy.get(this.legend).should("have.text", expectedText);
  }

  selectOption(optionValue) {
    this.dropdown.select(optionValue);
  }

  verifySelectedOption(expectedValue) {
    this.dropdown.should("have.value", expectedValue);
  }

  verifyHeaderText(expectedText) {
    cy.get(this.header).should("have.text", expectedText);
  }

  clickOpenTab() {
    cy.get(this.openTabButton).click();
    cy.window().its("open").should("be.called");
  }

  typeName(name) {
    cy.get(this.nameInput).type(name);
  }

  clickAlertButton() {
    cy.get(this.alertButton).click();
  }

  clickConfirmButton() {
    cy.get(this.confirmButton).click();
  }
}

export default new PageElements();
