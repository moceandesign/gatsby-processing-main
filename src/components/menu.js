import React from "react"
// Processing
import P5Manager from "./P5Manager"
import P5Wrapper from "./P5Wrapper"
import { MenuButton } from "./menuButton"

const Button_home = P5Wrapper("bouton a")
const Button_about = P5Wrapper("bouton b")
const Button_artwork = P5Wrapper("bouton c")

const menu_style = size => {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
  }
}

export function Menu(props) {
  return (
    <div>
      <P5Manager>
        <div style={menu_style(100)}>
          <MenuButton comp={Button_home} label="HOME" what="/" />
          <MenuButton comp={Button_about} label="ABOUT" what="/about" />
          <MenuButton comp={Button_artwork} label="ARTWORK" what="/artwork" />
        </div>
      </P5Manager>
    </div>
  )
}
