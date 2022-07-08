import { TemData } from "../TemData";

export {};

declare global {
  interface Window {
    temData: TemData;
  }
}