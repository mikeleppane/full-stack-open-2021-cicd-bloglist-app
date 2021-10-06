import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Button from "./Button";

test("clicking button twice should trigger event handler as many times", () => {
  const mockHandler = jest.fn();

  const component = render(
    <Button text={"like"} onButtonClick={mockHandler} />
  );
  const button = component.getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
