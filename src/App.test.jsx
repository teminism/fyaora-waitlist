import { fireEvent, render, screen } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import App from "./App";

describe("waitlist dashboard", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it("filters providers and announces successful filter application", async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Postcode"), {
      target: { value: "SW1A" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Filter" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Filters applied successfully"
    );
    expect(screen.getAllByRole("row")).toHaveLength(11);
    expect(screen.queryByText("Gler@pp2@gmail.com")).not.toBeInTheDocument();
  });

  it("sorts the table with a keyboard-accessible sort control", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Sort by Email" }));

    expect(screen.getAllByRole("row")[1]).toHaveTextContent(
      "Albertwatson13@gmail.com"
    );
    expect(
      screen.getByRole("columnheader", { name: /Email/ })
    ).toHaveAttribute("aria-sort", "ascending");
  });

  it("moves between pages with labelled pagination controls", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Go to page 2" }));

    expect(
      screen.getByRole("button", { name: "Go to page 2" })
    ).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Previous page" })).toBeEnabled();
  });

  it("opens a modal, moves focus into it, and closes on Escape", () => {
    render(<App />);

    const detailsButton = screen.getByRole("button", {
      name: "View details for johnsmith24@gmail.com",
    });
    detailsButton.focus();
    fireEvent.click(detailsButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close provider details" })
    ).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(detailsButton).toHaveFocus();
  });
});
