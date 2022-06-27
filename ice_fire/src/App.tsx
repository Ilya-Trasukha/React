import "./styles.css";
import Books from "./pages/books";
import Character from "./pages/characters"
import { Fragment } from "react";


export default function App() {
  return <Fragment><Books /><Character/></Fragment>
}
