describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Mikko Leppänen",
      username: "mleppane",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3003");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Log in to application");
      cy.get("#username_login").type("mleppane");
      cy.get("#password_login").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Mikko Leppänen logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Log in to application");
      cy.get("#username_login").type("mleppane");
      cy.get("#password_login").type("incorrect");
      cy.get("#login-button").click();
      cy.get("#notification").contains("wrong username or password");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mleppane", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("Mikko Leppänen logged in");
      cy.get("#create-new-blog-button").click();
      cy.get("#title_input").type("TDD harms architecture");
      cy.get("#author_input").type("Robert C. Martin");
      cy.get("#url_input").type(
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.htm"
      );
      cy.get("#createBlogForm").submit();
      cy.contains("TDD harms architecture");
    });

    it("A blog can be liked", function () {
      cy.contains("Mikko Leppänen logged in");
      cy.get("#create-new-blog-button").click();
      cy.get("#title_input").type("TDD harms architecture");
      cy.get("#author_input").type("Robert C. Martin");
      cy.get("#url_input").type(
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.htm"
      );
      cy.get("#submit-new-blog-button").click();
      cy.get("#show-blog-button").click();
      cy.get("#like-button").click();
      cy.contains("1");
    });

    it("A blog can be removed", function () {
      cy.contains("Mikko Leppänen logged in");
      cy.get("#create-new-blog-button").click();
      cy.get("#title_input").type("TDD harms architecture");
      cy.get("#author_input").type("Robert C. Martin");
      cy.get("#url_input").type(
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.htm"
      );
      cy.get("#submit-new-blog-button").click();
      cy.reload();
      cy.get("#show-blog-button").click();
      cy.get("#remove-button").click();
      cy.contains(
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.htm"
      ).should("not.exist");
    });
    it("Blogs should be sorted by likes", function () {
      cy.contains("Mikko Leppänen logged in");
      cy.get("#create-new-blog-button").click();
      cy.get("#title_input").type("TDD harms architecture");
      cy.get("#author_input").type("Robert C. Martin");
      cy.get("#url_input").type(
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.htm"
      );
      cy.get("#submit-new-blog-button").click();
      cy.get("#show-blog-button").click();
      cy.get("#like-button").click();
      cy.get("#likes").contains("1");
      cy.get("#like-button").click();
      cy.get("#likes").contains("2");

      cy.get("#title_input").type("React patterns");
      cy.get("#author_input").type("Michael Chan");
      cy.get("#url_input").type("https://reactpatterns.com/");
      cy.get("#submit-new-blog-button").click();
      cy.reload();
      cy.contains("Mikko Leppänen logged in");
      cy.get("button#show-blog-button").then((buttons) => {
        cy.wrap(buttons[1]).click();
        cy.get("#like-button").click();
        cy.get("#likes").contains("1");
        cy.get("#like-button").click();
        cy.get("#likes").contains("2");
        cy.get("#like-button").click();
        cy.get("#likes").contains("3");
        cy.reload();
      });
      cy.get("p#blog-title").then((p) => {
        console.log(p.length);
        cy.wrap(p[0]).contains("React patterns");
      });
    });
  });
});
