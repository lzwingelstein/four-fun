import PlayVsPlayerPage from "./page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("PlayVsPlayerPage", () => {
  describe("Header", () => {
    it("should render menu button", async () => {
      // Arrange
      render(<PlayVsPlayerPage />);
      // Act

      // Assert
      expect(await screen.getByText(/MENU/)).toBeInTheDocument();
    });
    it("should render restart button", async () => {
      // Arrange
      render(<PlayVsPlayerPage />);
      // Act

      // Assert
      expect(await screen.getByText(/RESTART/)).toBeInTheDocument();
    });
    it("should render scores", async () => {
      // Arrange
      render(<PlayVsPlayerPage />);
      // Act

      // Assert
      expect(await screen.findByText(/PLAYER.1./)).toBeInTheDocument();
      expect(await screen.findByText(/PLAYER 2/)).toBeInTheDocument();
      expect(await screen.findAllByText(/0/)).toHaveLength(2);
    });
  });
  describe("Board", () => {
    describe("when click on a column", () => {
      it("should push token", async () => {
        // Arrange
        render(<PlayVsPlayerPage />);
        const inputRow0 = await screen.getByTestId("input-row-0");
        expect(await screen.getByTestId("cell-0-0")).toHaveStyle(
          "background-image: url(undefined)"
        );
        // Act
        await inputRow0.click();
        // Assert
        const cell = await screen.getByTestId("cell-0-0");
        expect(cell).toBeInTheDocument();
        expect(cell).toHaveStyle("background-image: url(/img.svg)");
      });
      it("should display token animation when there is a winner", () => {
        // Arrange
        // Act
        // Assert
      });
    });
  });

  describe("Footer", () => {
    it("should render turn pannel", async () => {
      // Arrange
      render(<PlayVsPlayerPage />);

      // Assert
      const inputRow0 = await screen.getByTestId("input-row-0");
      expect(await screen.getByText(/PLAYER 1'S TURN/)).toBeInTheDocument();

      // Act
      await inputRow0.click();

      // Assert
      expect(await screen.getByText(/PLAYER 2'S TURN/)).toBeInTheDocument();
    });
    it("should render winner", () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
