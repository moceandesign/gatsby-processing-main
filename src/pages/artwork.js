import React from "react";
import { useState, useContext } from "react";
// app
// p5
import { Menu } from "../components/menu";
import P5Wrapper from "../components/P5Wrapper";
import P5Manager from "../components/P5Manager";
import { P5DispatchContext, P5StateContext } from "../components/P5Manager";
import { MenuButton } from "../components/menuButton";

const Artwork_wrapper = P5Wrapper("my artwork");
const Button_refresh = P5Wrapper("refresh");

const ArtWork = () => (
  <>
    <P5Manager>
      <div style={{ position: "absolute" }}>
        <ComponentBuffer comp={Artwork_wrapper} />
      </div>
      <div style={{ position: "absolute" }}>
        <Menu></Menu>
        <MenuButton comp={Button_refresh} label="REFRESH" what="add_x" />
      </div>
    </P5Manager>
  </>
);

export default ArtWork;

let buf = {
  value: 0,
};

function ComponentBuffer(props) {
  const { x } = useContext(P5StateContext);
  const [state_data, set_data] = useState(buf);
  if (x !== state_data.value) {
    buf.value = x;
    set_data(buf);
  }

  return <props.comp sketch={goban} data={state_data}></props.comp>;
}

/**
 *
 * P5JS / PROCESSING SKETCH
 *
 */
function goban(p5) {
  // VARIABLE GLOBAL
  let info_is = true;
  const goban = [];
  const stones = [];
  const param = {
    num: 19,
    bg: 125,
    fill: 255,
    stroke: 0,
    bg_alpha: 255,
    fill_alpha: 255,
    stroke_alpha: 255,
    thickness: 1,
    width: 20,
    height: 20,
    speed: 0.1,
  };

  // PROCESSING FUNCTION
  p5.setup = function () {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    init_goban(goban, param.num);
    init_stones(stones, param.num);
  };

  p5.draw = function () {
    p5.background(param.bg, param.bg_alpha);
    // show_goban(goban);
    // show_stones(stones);
    apparence(param);
    let_s_dance(stones, param);
    show_gui(info_is);
  };

  p5.mousePressed = function () {
    setting(param, goban, stones);
  };

  p5.keyPressed = function () {
    if (p5.key === "a") {
      set_apparence(param);
    }
    if (p5.key === "t") {
      set_size(param);
    }

    if (p5.key === "s") {
      set_speed(param);
    }

    if (p5.key === "n") {
      set_num(param, goban, stones);
    }

    if (p5.key === "i") {
      info_is = info_is ? false : true;
    }
  };

  // MY FUNCTIONS
  // SETTING
  function setting(struc, goban, pierre) {
    set_num(struc, goban, pierre);
    set_apparence(struc);
    set_size(struc);
    set_speed(struc);
  }

  function set_speed(struc) {
    struc.speed = p5.random(0, 0.5);
  }

  function set_num(struc, goban, stones) {
    struc.num = p5.round(p5.random(3, 19));
    goban.length = 0;
    stones.length = 0;
    init_goban(goban, struc.num);
    init_stones(stones, struc.num);
  }

  function set_size(struc) {
    struc.width = p5.random(p5.width / 30, p5.width);
    struc.height = p5.random(p5.height / 30, p5.height);
  }

  function set_apparence(struc) {
    struc.bg = p5.random(255);
    struc.fill = p5.random(255);
    struc.stroke = p5.random(255);
    struc.bg_alpha = p5.random(255);
    struc.fill_alpha = p5.random(255);
    struc.stroke_alpha = p5.random(255);
    struc.thickness = p5.random(10);
  }

  // MY GUI INFO
  function show_gui(is) {
    if (is) {
      let step = 20;
      let pos = 0;
      let x = 150;
      let y = 25;
      p5.noStroke();
      // bg gui
      p5.fill("yellow");
      p5.rect(x - step, y, 200, 140);
      //text
      p5.fill("magenta");
      p5.textAlign(p5.LEFT);
      p5.text("i: show info", x, y + (pos += step));
      p5.text("a: change apparence", x, y + (pos += step));
      p5.text("t: change size", x, y + (pos += step));
      p5.text("s: change speed", x, y + (pos += step));
      p5.text("n: change quantity", x, y + (pos += step));
      p5.text("mouse click change all settings", x, y + (pos += step));
    }
  }

  // MY ARTISTICS FUNCTIONS
  function let_s_dance(list, data) {
    let dist = 30;
    for (let i = 0; i < list.length; i++) {
      let pos_x = list[i].x;
      let pos_y = list[i].y;
      let distance = 10;
      let ang = p5.frameCount * p5.pow(data.speed, 4);
      dancing_stone(pos_x, pos_y, distance, ang, data);
    }
  }

  function dancing_stone(x, y, radius, angle, data) {
    let normal_pos_x = p5.cos(angle);
    let normal_pos_y = p5.sin(angle);
    let projection_x = normal_pos_x * radius;
    let projection_y = normal_pos_y * radius;
    let final_pos_x = x + projection_x;
    let final_pos_y = y + projection_y;
    let rot = p5.frameCount * 0.02;
    turning_stone(final_pos_x, final_pos_y, data.width, data.height, rot);
  }

  function turning_stone(x, y, w, h, rotation) {
    let offset_w = w / 2;
    let offset_h = h / 2;
    p5.push();
    p5.translate(x, y);
    p5.push();
    p5.rotate(rotation);
    p5.translate(-offset_w, -offset_h);
    p5.rect(0, 0, w, h);
    p5.pop();
    p5.pop();
  }

  function apparence(struc) {
    p5.fill(struc.fill, struc.fill_alpha);
    p5.stroke(struc.stroke, struc.stroke_alpha);
    p5.strokeWeight(struc.thickness);
  }

  // MY STONES FUNCTION
  function show_stones(list) {
    for (let i = 0; i < list.length; i++) {
      p5.circle(list[i].x, list[i].y, 10);
    }
  }

  function init_stones(list, size) {
    let size_cell_x = p5.width / size;
    let size_cell_y = p5.height / size;
    let offset_x = size_cell_x / 2;
    let offset_y = size_cell_y / 2;
    for (let i = 0; i <= size; i++) {
      for (let k = 0; k <= size; k++) {
        let x = i * size_cell_x - offset_x;
        let y = k * size_cell_y - offset_y;
        list.push({
          x: x,
          y: y,
          sx: size_cell_x,
          sy: size_cell_y,
          ox: offset_x,
          oy: offset_y,
        });
      }
    }
  }

  // MES FONCTIONS GOBAN
  function show_goban(list) {
    for (let i = 0; i < list.length; i++) {
      p5.line(list[i].ax, list[i].ay, list[i].bx, list[i].by);
    }
  }

  function init_goban(goban, size) {
    let size_cell_x = p5.width / size;
    let size_cell_y = p5.height / size;
    let offset_x = size_cell_x / 2;
    let offset_y = size_cell_y / 2;
    for (let i = 0; i <= size; i++) {
      // horizontal line
      let ax_h = 0;
      let ay_h = i * size_cell_y - offset_y;
      let bx_h = p5.width;
      let by_h = i * size_cell_y - offset_y;
      goban.push({ ax: ax_h, ay: ay_h, bx: bx_h, by: by_h });
      // vertical line
      let ax_v = i * size_cell_x - offset_x;
      let ay_v = 0;
      let bx_v = i * size_cell_x - offset_x;
      let by_v = p5.height;
      goban.push({ ax: ax_v, ay: ay_v, bx: bx_v, by: by_v });
    }
  }
}
