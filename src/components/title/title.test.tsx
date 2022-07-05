import React from "react";
import { render } from "@testing-library/react";
import Title from "./index";

describe("Title tests", () => {
  it("should display a text", () => {
    const { getByTestId } = render(<Title text="Test text" />);
    const titleElement = getByTestId("title-test");
    expect(titleElement.textContent).toEqual("Test text");
  });
  it("Not should display a text", () => {
    const { getByTestId } = render(<Title text="Test text" />);
    const titleElement = getByTestId("title-test");
    expect(titleElement.textContent).not.toEqual("test text ");
  });
});
