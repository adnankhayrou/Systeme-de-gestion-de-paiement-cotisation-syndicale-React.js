import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import EditApartment from "../src/components/Apartments/EditApartment";

describe("EditApartment", () => {
  it("renders without error", () => {
    const { getByText } = render(<EditApartment />);
    expect(getByText("EDIT APARTMENT")).toBeInTheDocument();
  });

  it('submits form and updates apartment on successful API call', () => {
    const { getByLabelText, getByText } = render(<EditApartment />);
    fireEvent.change(getByLabelText("Building ID"), { target: { value: "B2" } });
    fireEvent.change(getByLabelText("Apartment Number"), { target: { value: "12" } });
    fireEvent.change(getByLabelText("Resident Name"), { target: { value: "adnane" } });
    fireEvent.change(getByLabelText("Resident CIN"), { target: { value: "J342114" } });
    fireEvent.change(getByLabelText("Resident Phone"), { target: { value: "1234567890" } });
    fireEvent.change(getByLabelText("Condition"), { target: { value: "owner" } });
    
    fireEvent.click(getByText("Save"));

    expect(getByText("Success!")).toBeInTheDocument();
  });

});
