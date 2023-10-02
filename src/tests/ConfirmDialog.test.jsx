import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for jest-dom matchers
import ConfirmDialog from "../components/shared/ConfirmDialog";

describe("ConfirmDialog Component", () => {
  it("renders without crashing", () => {
    render(
      <ConfirmDialog show={true} message="Test Message" confirmClick={() => {}} closeClick={() => {}} />
    );
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("calls the confirmClick function when 'Yes' button is clicked", () => {
    const confirmClickMock = jest.fn();
    render(
      <ConfirmDialog show={true} message="Test Message" confirmClick={confirmClickMock} closeClick={() => {}} />
    );

    const yesButton = screen.getByText("Yes");
    fireEvent.click(yesButton);
    expect(confirmClickMock).toHaveBeenCalled();
  });

  it("calls the closeClick function when 'No' button is clicked", () => {
    const closeClickMock = jest.fn();
    render(
      <ConfirmDialog show={true} message="Test Message" confirmClick={() => {}} closeClick={closeClickMock} />
    );

    const noButton = screen.getByText("No");
    fireEvent.click(noButton);
    expect(closeClickMock).toHaveBeenCalled();
  });

  it("renders correctly when not visible (show=false)", () => {
    render(
      <ConfirmDialog show={false} message="Test Message" confirmClick={() => {}} closeClick={() => {}} />
    );
    expect(screen.queryByText("Test Message")).not.toBeInTheDocument();
  });
});
