import "@testing-library/jest-dom";
import { vi } from "vitest";

// Asegura que fetch exista en todos los tests
vi.stubGlobal("fetch", vi.fn());