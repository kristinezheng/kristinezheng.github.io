// as seen on https://github.com/RachelBedder/fungi_dimensions/tree/seldon 
'use strict';
function mushroomshape(stalky, dotr, caprx, capry, cap_color, mid_color, stalk_color){
  //cap_color="#E6B0AA", mid_color="#922B21", stalk_color="#D98880"
  //cap_color="#000000", mid_color="#eeeeee", stalk_color="#999999" black forest
  const centerx = 500;
  const centery = 500;
  const sy = parseFloat(stalky);
  const dr = parseFloat(dotr);

  var viewx1 = centerx-caprx;
  var viewy1 = centery-capry;
  var viewx2 = centerx+caprx;
  var viewy2 = centery+2.5*sy;

  //separate components for ease of organization

  var header = ` <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="${viewx1} ${viewy1} ${viewx2} ${viewy2} " style="enable-background:new ${viewx1} ${viewy1} ${viewx2} ${viewy2} ;" xml:space="preserve"> <defs/> <g> `;

  var cap = `<clipPath id="cut-off"> <rect x=${centerx - caprx} y=${centery - capry} width=${2*caprx} height=${capry} />`
        + `</clipPath> <ellipse id = "cap-ellipse" cx=${centerx} cy=${centery} rx=${caprx} ry=${capry} fill=${cap_color} clip-path="url(#cut-off)"/>;`

  var liney = (caprx/4)*Math.sqrt(1-(caprx/2)**2/(caprx**2));
  var middle = `<ellipse id = "middle-ellipse" cx=${centerx} cy=${centery} rx=${caprx} ry=${caprx/4} fill=${mid_color} />`;
  var lines = `<line id = "horizontal-line" x1=${centerx - caprx} y1=${centery} x2=${centery + caprx} y2=${centery} stroke=${cap_color} stroke-width="5"/>`
              +  `<line id = "vertical-line" x1=${centerx} y1=${centery - caprx/4} x2=${centerx} y2=${centery + caprx/4} stroke=${cap_color} stroke-width="5"/>`
              +  `<line id = "left-upper" x1=${centerx - caprx/2} y1=${centery - liney} x2=${centerx + caprx/2} y2=${centery + liney} stroke=${cap_color} stroke-width="5"/>`
              +  `<line id = "right-upper" x1=${centerx - caprx/2} y1=${centery + liney} x2=${centerx + caprx/2} y2=${centery - liney} stroke=${cap_color} stroke-width="5"/>`;

  var c = (capry - (caprx/4))/6;
  var dots =
          `<ellipse id = "top-center-dot" cx=${centerx} cy=${centery - 5* c} rx=${dotr} ry=${dotr} fill=${mid_color} />`
          + `<ellipse id = "left-bottom-dot" cx=${centerx - caprx / 2} cy=${centery - 3 * c} rx=${dotr} ry=${dotr} fill=${mid_color} />`
          + `<ellipse id = "right-buttom-dot" cx=${centerx + caprx / 2} cy=${centery - 3 * c} rx=${dotr} ry=${dotr} fill=${mid_color} />`;

  var stalk = `<clipPath id="stalk_cut">
                    <ellipse cx=${centerx} cy=${centery + sy}  rx=${capry} ry=${sy} />
                </clipPath>`
                +   `<polygon id = "stem-trapezoid" points="${centerx- caprx/3}, ${centerx} ${centerx+ caprx/3}, ${centery} ${centerx+ 2*caprx/3}, ${centery+2*stalky} ${centerx- 2*caprx/3}, ${centery+2*stalky}" fill=${stalk_color}  clip-path="url(#stalk_cut)"/>`

  // add together separated components 
  var mushroom = header + cap + middle +lines +dots + stalk + '</g> </svg>';
  return mushroom;
}

(function() {
  class mushroom_class extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: 'open' });

      // creating a container for the editable-list component
      const svgContainer = document.createElement('div');

      // get attribute values from getters
      const stalky = this.stalky || 300;
      const dotr = this.dotr || 40;
      const caprx = this.caprx || 450;
      const capry = this.capry || 550;
      const cap_color = this.cap_color || "#f0ebea";
      const mid_color = this.mid_color || "#000000";
      const stalk_color = this.stalk_color || "#cdc2bf";

      svgContainer.innerHTML = mushroomshape(stalky, dotr, caprx, capry, cap_color, mid_color, stalk_color);

      // appending the container to the shadow DOM
      shadow.appendChild(svgContainer);
    }

    get stalky(){
      return this.getAttribute('stalky') || '';
    }

    get dotr(){
      return this.getAttribute('dotr') || '';
    }

    get caprx(){
      return this.getAttribute('caprx') || '';
    }

    get capry(){
      return this.getAttribute('capry') || '';
    }
    get cap_color(){
      return this.getAttribute('cap_color') || '';
    }
    get mid_color(){
      return this.getAttribute('mid_color') || '';
    }
    get stalk_color(){
      return this.getAttribute('stalk_color') || '';
    }

  }
  // let the browser know about the custom element
  customElements.define(`custom-mushroom`, mushroom_class);
})();
