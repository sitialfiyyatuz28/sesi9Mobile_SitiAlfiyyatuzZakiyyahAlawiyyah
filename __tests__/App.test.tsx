import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import App from "../App";

describe("App Tests", () => {
  test("Login berhasil dengan username dan password yang benar", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText("Username"), "Alfi");
    fireEvent.changeText(getByPlaceholderText("Password"), "alfi");
    fireEvent.press(getByText("Login"));

    expect(queryByText("Welcome to Travelin")).toBeTruthy();
  });

  test("Login gagal dengan username atau password yang salah", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText("Username"), "wrongUser");
    fireEvent.changeText(getByPlaceholderText("Password"), "wrongPass");
    fireEvent.press(getByText("Login"));

    expect(queryByText("Welcome to Travelin")).toBeNull();
  });

  test("Menambah destinasi baru dengan URL valid berhasil", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<App />);
    fireEvent.changeText(getByPlaceholderText("Username"), "Alfi");
    fireEvent.changeText(getByPlaceholderText("Password"), "alfi");
    fireEvent.press(getByText("Login"));

    fireEvent.changeText(getByPlaceholderText("Nama Destinasi"), "Bali");
    fireEvent.changeText(getByPlaceholderText("URL Gambar"), "https://example.com/bali.jpg");
    fireEvent.press(getByText("Tambah Destinasi"));

    expect(queryByText("Bali")).toBeTruthy();
  });

});
