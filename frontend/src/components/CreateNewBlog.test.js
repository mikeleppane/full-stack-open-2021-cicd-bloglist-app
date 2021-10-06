import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import CreateNewBlog from "./CreateNewBlog";

test("renders content", () => {
  const createBlogMock = jest.fn();

  const component = render(<CreateNewBlog createBlog={createBlogMock} />);
  const form = component.container.querySelector("#createBlogForm");
  const title_input = component.container.querySelector("#title_input");
  const author_input = component.container.querySelector("#author_input");
  const url_input = component.container.querySelector("#url_input");
  fireEvent.change(title_input, {
    target: { value: "TDD harms architecture" },
  });
  fireEvent.change(author_input, {
    target: { value: "Robert C. Martin" },
  });
  fireEvent.change(url_input, {
    target: {
      value:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    },
  });
  fireEvent.submit(form);
  expect(createBlogMock.mock.calls).toHaveLength(1);
  expect(createBlogMock.mock.calls[0][0].title).toContain(
    "TDD harms architecture"
  );
  expect(createBlogMock.mock.calls[0][0].author).toContain("Robert C. Martin");
  expect(createBlogMock.mock.calls[0][0].url).toContain(
    "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
  );
});
