/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const gameTheme = __webpack_require__(1)
const BaseRender = __webpack_require__(2)

class GameView extends BaseRender {
    constructor() {
        super(null)
        this.createPrerenderCanvas();
    }

    createPrerenderCanvas() {
        this.prerender = document.createElement('canvas');
        this.prerender.width = 1280;
        this.prerender.height = 1024;
        this.ctx = this.prerender.getContext('2d');
    }

    handleClick(pos) {
        for (let button of this.buttons) {
            if ((pos.x > button.x && pos.x < button.x + button.w) &&
                (pos.y > button.y && pos.y < button.y + button.h)) {
                button.click();
            }
        }
    }

    drawCls() {
        this.ctx.fillStyle = gameTheme.base
        this.ctx.fillRect(0, 0, 1280, 1024)
    }

    drawButtons(){
        for (let button of this.buttons) {
            this.drawButton(button.label, button.x, button.y, button.w, button.h)
        }
    }

    

    drawButton(label, x, y, w, h) {

        this.ctx.save();
        this.ctx.font = '40px arial black';
        this.ctx.lineWidth = gameTheme.numLine;
        let text = this.ctx.measureText(label);
        let height = text.emHeightAscent ? text.emHeightAscent : this.ctx.measureText('M').width;

        this.ctx.fillStyle = gameTheme.boxLight;
        this.ctx.strokeStyle = gameTheme.boxStroke;
        this.roundRect(x, y, w, h, 20)
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.textBaseline = "middle"
        this.ctx.fillStyle = gameTheme.boxStroke;
        this.ctx.fillText(label, x + w / 2 - (text.width / 2), y + h / 2)
        this.ctx.restore();

    }
}

module.exports = GameView



/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
    base: "white",
    numStroke: "black",
    numDark: "black",
    numTextStroke: "black",
    numText: "rgb(207,207,207)",
    numLight: "rgba(207,207,207,0.1)",
    whaleStroke: "black",
    whaleLight: "rgba(207,207,207,0.1)",
    whaleDark: "black",
    castleStroke: "black",
    castleLight: "rgba(207,207,207,0.1)",
    castleDark: "black",
    opcode: "black",
    boxStroke: "black",
    boxLight: "rgba(207,207,207,0.1)",
    whaleLine: 5,
    boxLine: 7,
    numLine: 3,
    castleLine: 5
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {


class BaseRender {
    constructor(ctx) {
        this.ctx = ctx;
    }
   
    roundRect(x, y, width, height, radius) {
        if (typeof radius === 'undefined') {
          radius = 5;
        }
        if (typeof radius === 'number') {
          radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
          var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
          for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
          }
        }
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius.tl, y);
        this.ctx.lineTo(x + width - radius.tr, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        this.ctx.lineTo(x + width, y + height - radius.br);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        this.ctx.lineTo(x + radius.bl, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        this.ctx.lineTo(x, y + radius.tl);
        this.ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        this.ctx.closePath();
     }

    getStringFor(num) {
        return String("0000" + num.toString(2)).slice(-4);
    }
}

module.exports = BaseRender;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const castle = __webpack_require__(9)
  , whale = __webpack_require__(10)
  , BaseRender = __webpack_require__(2)
  , Logic = __webpack_require__(11)


const icondata = [
  { row: 0, col: 0, bits: [] },
  { row: 1, col: 1, bits: [1] },
  {
    row: 3, col: 1, bits: [
      1,
      0,
      1]
  },
  // 3
  {
    row: 3, col: 3, bits: [
      0, 0, 1,
      0, 1, 0,
      1, 0, 0]
  },
  {
    row: 3, col: 3, bits: [
      1, 0, 1,
      0, 0, 0,
      1, 0, 1]
  },
  {
    row: 3, col: 3, bits: [
      1, 0, 1,
      0, 1, 0,
      1, 0, 1]
  },
  // 6
  {
    row: 3, col: 3, bits: [
      1, 0, 1,
      1, 0, 1,
      1, 0, 1]
  },
  {
    row: 3, col: 3, bits: [
      1, 0, 1,
      1, 1, 1,
      1, 0, 1]
  },
  {
    row: 5, col: 3, bits: [
      1, 0, 1,
      0, 1, 0,
      1, 0, 1,
      0, 1, 0,
      1, 0, 1]
  },
  // 9
  {
    row: 5, col: 3, bits: [
      1, 0, 1,
      1, 0, 1,
      0, 1, 0,
      1, 0, 1,
      1, 0, 1
    ]
  },
  //10
  {
    row: 5, col: 3, bits: [
      1, 0, 1,
      1, 0, 1,
      1, 0, 1,
      1, 0, 1,
      1, 0, 1
    ]
  },
  //11
  {
    row: 5, col: 3, bits: [
      1, 0, 1,
      1, 0, 1,
      1, 1, 1,
      1, 0, 1,
      1, 0, 1
    ]
  },
  //12
  {
    row: 5, col: 3, bits: [
      1, 0, 1,
      1, 1, 1,
      1, 0, 1,
      1, 1, 1,
      1, 0, 1
    ]
  },
  //13
  {
    row: 5, col: 3, bits: [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      0, 1, 0
    ]
  },
  {
    row: 5, col: 3, bits: [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 0, 1
    ]
  },
  {
    row: 5, col: 3, bits: [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
      1, 1, 1
    ]
  },
];



//const cornerIcon = {w:20, h:20};

class NibbleSquareRender extends BaseRender {
  constructor(ctx) {
    super(ctx);
  }

  drawCastles(theme, type) {
    for (let bottom = 1; bottom > -2; bottom -=2) {
      for (let side = 1; side > -2; side -= 2) {
        //console.log(`bottom: ${bottom} side: ${side}`)

        let mul = 1;
        this.ctx.save();
        if (side < 0) {
          this.ctx.scale(side, side);
          this.ctx.translate(-NibbleSquareRender.szCanvas.w, -NibbleSquareRender.szCanvas.h);
        }
        this.ctx.translate(NibbleSquareRender.offCastle.x-bottom*80, NibbleSquareRender.offCastle.y);
        
        this.ctx.scale(NibbleSquareRender.scaleCastle, NibbleSquareRender.scaleCastle);
        
        castle.draw(this.ctx);
        this.ctx.fillStyle = theme.castleLight;
        this.ctx.strokeStyle = theme.castleStroke;
        this.ctx.lineWidth = theme.castleLine * (1/ NibbleSquareRender.scaleCastle);
        if ((type == 1 && bottom==1) || (type == 2 && bottom==-1) || type > 2) {
          this.ctx.fillStyle = theme.castleDark;
        }
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
      }
    }
  }

  drawNumbers(theme, num) {

    let tick = 0;
    let pad = (num < 8) ? NibbleSquareRender.szNumber.w : 0;
    let size = (num < 8) ? NibbleSquareRender.szNumber.w*5 : NibbleSquareRender.szNumber.w*7;
    let left = size/2;

    this.ctx.save();
    for (let bit = (num > 7) ? 4 : 3; bit >= 1; bit--) {
      let mask = 1 << (bit - 1);
      for (let r = 0; r < 2; r++) {
        this.ctx.save();

        if (r) {
          this.ctx.scale(-1, -1);
          this.ctx.translate(-NibbleSquareRender.szCanvas.w, -NibbleSquareRender.szCanvas.h);
        }

        // Draw number
        this.ctx.font = '48px arial black';
        this.ctx.lineWidth = theme.numLine;
        
        let opcode = num.toString();
        let text = this.ctx.measureText(opcode);
        let height = text.emHeightAscent ? text.emHeightAscent:this.ctx.measureText('M').width;

        this.ctx.save();
        this.ctx.translate(NibbleSquareRender.szCanvas.w/2-(text.width/2), NibbleSquareRender.offNumber.y+NibbleSquareRender.szNumber.h+height);
        this.ctx.fillStyle = theme.numText;
        this.ctx.strokeStyle = theme.numTextStroke;
        this.ctx.fillText(opcode, 0, 0);   
        this.ctx.strokeText(opcode, 0, 0);   
        this.ctx.restore();

        
        this.ctx.translate(NibbleSquareRender.offNumber.x - left + (2 * tick * NibbleSquareRender.szNumber.w), 
            NibbleSquareRender.offNumber.y);

        this.roundRect(0, 0, NibbleSquareRender.szNumber.w, NibbleSquareRender.szNumber.h, 3);
        

        this.ctx.fillStyle = theme.numDark;
        this.ctx.strokeStyle = theme.numStroke;
        if (num & mask) {
          this.ctx.fillStyle = theme.numDark;
        } else {
          this.ctx.fillStyle = theme.numLight;
        }
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
      }
      tick++;
    }
    this.ctx.restore();
  }

  drawOpcodes(theme, num, type) {
    let opcodes = ["OR", "AND", "NOR", "NAND"];
    for (let side = 1; side > -2; side -= 2) {
      let mul = 1;
      this.ctx.save();
      if (side < 0) {
        this.ctx.scale(side, side);
        this.ctx.translate(-NibbleSquareRender.szCanvas.w, -NibbleSquareRender.szCanvas.h);
      }

      this.ctx.translate(NibbleSquareRender.szCanvas.w/2, NibbleSquareRender.szCanvas.h/2);
      this.ctx.rotate(Math.PI/2);
      this.ctx.translate(-NibbleSquareRender.szCanvas.w/2, -NibbleSquareRender.szCanvas.h/2);

      let opcode = opcodes[(num+type)%4];

      this.ctx.save()
      
      this.ctx.translate(NibbleSquareRender.szCanvas.w/2-100, 5);
      this.ctx.scale(2,2);
      Logic['draw'+opcode](this.ctx, theme.opcode);
      this.ctx.restore()
      

      this.ctx.font = '28px arial black';
      
      let text = this.ctx.measureText(opcode);
      this.ctx.translate(NibbleSquareRender.offOpcode.x-(text.width/2), NibbleSquareRender.offOpcode.y);

      this.ctx.fillStyle = theme.opcode;
      this.ctx.fillText(opcode, 0, 0);      
     
      this.ctx.restore();
    }

  }



  drawWhale(theme, num) {
    if (num) {
      this.drawWhaleBox(theme);
      return;
    }
    let scale = 2;
    let offsetWhale = { x: NibbleSquareRender.szCanvas.w / 2 - scale * NibbleSquareRender.szWhale.w / 2, y: NibbleSquareRender.szCanvas.h / 2 - scale * NibbleSquareRender.szWhale.h / 2 };

    this.ctx.save();

    this.ctx.translate(offsetWhale.x, offsetWhale.y);
    this.ctx.scale(scale, scale);
    whale.draw(this.ctx);
    this.ctx.strokeStyle = theme.whaleStroke;
    this.ctx.lineWidth = theme.whaleLine;
    // this is always white
    this.ctx.fillStyle = "white"
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawWhaleIcon(theme) {
    this.ctx.save();

    this.ctx.scale(NibbleSquareRender.scaleIcon.x, NibbleSquareRender.scaleIcon.y);
    whale.draw(this.ctx);
    this.ctx.strokeStyle = theme.whaleStroke;
    this.ctx.fillStyle = theme.whaleDark;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawNumberIcons(theme, number) {

    this.drawWhale(theme, number);

    let padding = 0;
    this.ctx.save();
    let sizeAll = { w: icondata[number].col * (NibbleSquareRender.szIcon.w + padding), h: icondata[number].row * (NibbleSquareRender.szIcon.h + padding) };
    // translate based on center

    for (let row = 0; row < icondata[number].row; row++) {
      for (let col = 0; col < icondata[number].col; col++) {
        if (icondata[number].bits[row * icondata[number].col + col]) {
          this.ctx.save();
          // CENTER
          this.ctx.translate((NibbleSquareRender.szCanvas.w / 2) - (sizeAll.w / 2), (NibbleSquareRender.szCanvas.h / 2) - (sizeAll.h / 2));
          this.ctx.translate(col * (NibbleSquareRender.szIcon.w + padding), row * (NibbleSquareRender.szIcon.h + padding));

          if (row > (icondata[number].row) / 2) {
            this.ctx.scale(-1, -1)
            this.ctx.translate(-(NibbleSquareRender.szIcon.w), -(NibbleSquareRender.szIcon.h))
          }
          this.ctx.translate(NibbleSquareRender.offIconInRect.x, NibbleSquareRender.offIconInRect.y);

          this.drawWhaleIcon(theme);
          this.ctx.restore();
        }
      }
    }
    this.ctx.restore();
  }

  drawWhaleBox(theme) {
    let off = NibbleSquareRender.szWhale.h*2.25;
    this.ctx.save();
    this.ctx.fillStyle = theme;
    this.ctx.strokeStyle = theme;

    this.roundRect(off, off, NibbleSquareRender.szCanvas.w - 2 * off, 
      NibbleSquareRender.szCanvas.h - 2 * off, -90);

    this.ctx.strokeStyle = theme.boxStroke;
    this.ctx.fillStyle = theme.boxLight;
    this.ctx.lineWidth = theme.boxLine;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawCard(theme, num, castleType) {
    this.ctx.save();
   
    this.drawBack(theme);

    this.ctx.translate(NibbleSquareRender.szCanvas.w / 2, NibbleSquareRender.szCanvas.h / 2);
    this.ctx.rotate(-45 * Math.PI / 180);
    this.ctx.translate(-NibbleSquareRender.szCanvas.w / 2, -NibbleSquareRender.szCanvas.h / 2);
    this.drawCardContent(theme, num, castleType);
    this.ctx.restore();
  }
  drawCardContent(theme, num, castleType) {
    this.ctx.save();
    // Draw any accents
    this.drawOpcodes(theme, num, castleType);
    // Draw Numbers 
    this.drawNumbers(theme, num);
    // Draw Number Icons
    this.drawNumberIcons(theme, num); 
    // Draw Arrows
    this.drawCastles(theme, castleType);
    this.ctx.restore();
  }

  drawGuides() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(NibbleSquareRender.szCanvas.w / 2, 0)
    this.ctx.lineTo(NibbleSquareRender.szCanvas.w / 2, NibbleSquareRender.szCanvas.h)
    this.ctx.moveTo(0, NibbleSquareRender.szCanvas.h / 2)
    this.ctx.lineTo(NibbleSquareRender.szCanvas.w, NibbleSquareRender.szCanvas.h / 2)

    this.ctx.moveTo(NibbleSquareRender.offCastle.x, 0)
    this.ctx.lineTo(NibbleSquareRender.offCastle.x, NibbleSquareRender.szCanvas.h)
    this.ctx.moveTo(0, NibbleSquareRender.offCastle.y)
    this.ctx.lineTo(NibbleSquareRender.szCanvas.w, NibbleSquareRender.offCastle.y)

    this.ctx.strokeStyle = 'cyan';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawBack(theme) {
    //if (!this.isBackDrawn) return;
    let off = 37.5;
    this.ctx.save();
    this.ctx.fillStyle = theme.base;
    this.ctx.strokeStyle = 'black';

    this.roundRect(off, off, NibbleSquareRender.szCanvas.w - 2 * off, NibbleSquareRender.szCanvas.h - 2 * off, 50);

    this.ctx.lineWidth = 7;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }
}
NibbleSquareRender.szCanvas = { w: 825, h: 825 };
NibbleSquareRender.szWhale = { w: 210, h: 298 };
NibbleSquareRender.szIcon = { w: NibbleSquareRender.szWhale.w * 0.35, h: NibbleSquareRender.szWhale.h * 0.35 };
NibbleSquareRender.szIconInRect = { w: NibbleSquareRender.szWhale.w * 0.25, h: NibbleSquareRender.szWhale.h * 0.25 };
NibbleSquareRender.scaleIcon = { x: NibbleSquareRender.szIconInRect.w / NibbleSquareRender.szWhale.w, y: NibbleSquareRender.szIconInRect.h / NibbleSquareRender.szWhale.h };
NibbleSquareRender.offIconInRect = { x: (NibbleSquareRender.szIcon.w - NibbleSquareRender.szIconInRect.w) / 2, y: (NibbleSquareRender.szIcon.h - NibbleSquareRender.szIconInRect.h) / 2 }
NibbleSquareRender.szNumber = { w: NibbleSquareRender.szCanvas.w / 75, h: NibbleSquareRender.szCanvas.h / 20 }
NibbleSquareRender.offNumber = { x: NibbleSquareRender.szCanvas.w / 2, y: -10 };
NibbleSquareRender.szCastle = { w: 210, h: 298 };
NibbleSquareRender.scaleCastle = 0.2;
NibbleSquareRender.szCastleScaled = { w: NibbleSquareRender.szCastle.w * NibbleSquareRender.scaleCastle, h: NibbleSquareRender.szCastle.h * NibbleSquareRender.scaleCastle };
NibbleSquareRender.offCastle = { x: NibbleSquareRender.szCanvas.w / 2 - NibbleSquareRender.szCastleScaled.w/2, y: NibbleSquareRender.offNumber.y + 55 };
NibbleSquareRender.offOpcode = { x: (NibbleSquareRender.szCanvas.w / 2), y: 0 };

module.exports = NibbleSquareRender

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = [{
    base: "white",
    numStroke: "#0069c0",
    numDark: "#0069c0",
    numTextStroke: "#0069c0",
    numText: "rgba(110,198,255,0.1)",
    numLight: "rgba(110,198,255,0.1)",
    whaleStroke: "#0069c0",
    whaleLight: "rgba(110,198,255,0.1)",
    whaleDark: "#0069c0",
    castleStroke: "#0069c0",
    castleLight: "rgba(110,198,255,0.1)",
    castleDark: "#0069c0",
    opcode: "#0069c0",
    boxStroke: "#0069c0",
    boxLight: "rgba(110,198,255,0.1)",
    whaleLine: 5,
    boxLine: 7,
    numLine: 3,
    castleLine: 5
},
{
    base: "white",
    numStroke: "#ba000d",
    numDark: "#ba000d",
    numTextStroke: "#ba000d",
    numText: "rgba(255,121,97,0.1)",
    numLight: "rgba(255,121,97,0.1)",
    whaleStroke: "#ba000d",
    whaleLight: "rgba(255,121,97,0.1)",
    whaleDark: "#ba000d",
    castleStroke: "#ba000d",
    castleLight: "rgba(255,121,97,0.1)",
    castleDark: "#ba000d",
    opcode: "#ba000d",
    boxStroke: "#ba000d",
    boxLight: "rgba(255,121,97,0.1)",
    whaleLine: 5,
    boxLine: 7,
    numLine: 3,
    castleLine: 5
},
{
    base: "white",
    numStroke: "#087f23",
    numDark: "#087f23",
    numTextStroke: "#087f23",
    numText: "rgba(128,226,126,0.1)",
    numLight: "rgba(128,226,126,0.1)",
    whaleStroke: "#087f23",
    whaleLight: "rgba(128,226,126,0.1)",
    whaleDark: "#087f23",
    castleStroke: "#087f23",
    castleLight: "rgba(128,226,126,0.1)",
    castleDark: "#087f23",
    opcode: "#087f23",
    boxStroke: "#087f23",
    boxLight: "rgba(128,226,126,0.1)",
    whaleLine: 5,
    boxLine: 7,
    numLine: 3,
    castleLine: 5
}
];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MainView = __webpack_require__(7)
const info = __webpack_require__(13)
const info3 = __webpack_require__(14)
const games = __webpack_require__(15)
const play = new MainView();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


const GameView = __webpack_require__(0)
const PlayDeck = __webpack_require__(8);
const GatePlay = __webpack_require__(12);

const SCENE_START = 1;

class MainMenu extends GameView { // extends NibbleDeck {
    constructor() {
        super();
        let startY = 0
        this.startButtons = [
            { label: "nibble", x: 300, y: startY += 80, w: 300, h: 60, click: () => this.playNibble() },
            { label: "gates", x: 300, y: startY += 80, w: 300, h: 60, click: () => this.playGates() },
            { label: "Help", x: 300, y: startY += 80, w: 300, h: 60, click: () => window.location.replace('games.html') },
        ]
        this.view = undefined;

        this.createCanvas();
        this.sceneStart();
    }

    sceneStart() {
        this.scene = SCENE_START;
        this.buttons = this.startButtons
        this.draw();
    }

    playNibble() {
        this.view = new PlayDeck(this.screenctx, 3, 8);
        this.view.draw();
    }

    playGates() {
        this.view = new GatePlay(this.screenctx, 3, 8);
        this.view.draw();
    }

    createCanvas() {
        let canvas = document.createElement('canvas');
        this.screenctx = canvas.getContext('2d');

        canvas.id = "CursorLayer";
        canvas.width = 1280;
        canvas.height = 1024;
        canvas.style.zIndex = 8;
        canvas.style.position = "absolute";
        document.body.appendChild(canvas);


        canvas.addEventListener("click", (e) => this.onClick(e))
        this.canvas = canvas
    }

    getMousePos(evt) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    onClick(e) {
        let pos = this.getMousePos(e);

        if (this.view) this.view.handleClick(pos);
        else (this.handleClick(pos))

    }

    draw() {
        this.drawCls();

        this.drawButtons();
        this.renderToScreen();
    }
    renderToScreen() {
        this.screenctx.drawImage(this.prerender, 0, 0)
    }
}

module.exports = MainMenu



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Render = __webpack_require__(3)
const GameView = __webpack_require__(0)

const gameTheme = __webpack_require__(1)
const cardTheme = __webpack_require__(4)

const SCENE_START = 1;
const SCENE_PLAY = 2;
const SCENE_DEALER = 3;

const DEALER_DICE_D10 = 1;
const DEALER_DICE_D248 = 2;
const DEALER_MUST = 3;


const HAND_PLAYER = 0;
const HAND_DEALER = 1;

const NATURALS_NONE = 0;
const NATURALS_ZERO = 1;
const NATURALS_TWENTY = 21;



class PlayDeck extends GameView {
    constructor(screenctx, colors, maxnum) {
        super();
        this.nummask = 0b111;
        this.typemask = 0b11000;
        this.typeshift = 3;
        this.colormask = 0b111111100000;
        this.colorshift = 5;

        if (maxnum > 8) {
            this.nummask = 0b1111;
            this.typemask = 0b110000;
            this.typeshift = 4;
            this.colormask = 0b1111111000000;
            this.colorshift = 6;
        }

        this.gameButtons = [
            { label: "hit", x: 700, y: 70, w: 200, h: 60, click: () => this.clickHit() },
            { label: "stay", x: 700, y: 150, w: 200, h: 60, click: () => this.clickStay() },
            { label: "restart", x: 700, y: 650, w: 200, h: 60, click: () => this.sceneStart() }
        ]


        let startY = 0
        this.startButtons = [
            { label: "Dice-10", x: 300, y: startY += 80, w: 300, h: 60, click: () => this.clickDealerDice(DEALER_DICE_D10) },
            { label: "Dice-248", x: 300, y: startY += 80, w: 300, h: 60, click: () => this.clickDealerDice(DEALER_DICE_D248) },
            { label: "Hit <10", x: 300, y: startY += 80, w: 300, h: 60, click: () => this.clickDealerMust(10) },
            { label: "Hit <12", x: 300, y: startY += 80, w: 300, h: 60, click: () => this.clickDealerMust(12) },
            { label: "Hit <14", x: 300, y: startY += 80, w: 300, h: 60, click: () => this.clickDealerMust(14) },
            { label: "Hit <15", x: 300, y: startY += 80, w: 300, h: 60, click: () => this.clickDealerMust(15) },
            { label: "Rules", x: 300, y: startY += 80, w: 300, h: 60, click: () => window.location.replace('nibble-info.html') },
        ]


        this.render = new Render(this.ctx);
        this.screenctx = screenctx;

        this.startData = { colors: colors, types: 4, maxnum: maxnum }
        this.sceneStart();
    }

    sceneStart() {
        this.buildDeck();
        this.shuffle();

        this.handsize = 2;
        this.hands = [{}]

        this.scene = SCENE_START;
        this.buttons = this.startButtons
        this.money = 100;
        this.bet = 10;
        this.message = "Let's play!"
        this.draw();
    }


    clickHit() {
        this.addCard(HAND_PLAYER);
        this.updateGame();
    }
    clickStay() {
        this.endHand();
    }
    clickDealerDice(type) {
        this.dealerType = type;
        this.scenePlay();
    }
    scenePlay() {
        this.naturals = false;
        this.scene = SCENE_PLAY;
        this.buttons = this.gameButtons;
        this.dealHands();
        this.updateGame();
        this.draw();
    }
    clickDealerMust(num) {
        this.dealerType = DEALER_MUST;
        this.dealerMust = num
        this.hands = [{}, {}];
        this.scenePlay();
    }

    updateGame() {
        let player = this.getScore(HAND_PLAYER)

        if (player > 20) {
            this.endHand();
        } if (this.isNatural()) {
            this.endHand();
        } else {
            this.draw();
        }
    }

    isNatural() {
        // Check for naturals before making deal take cards
        if (this.hands[HAND_PLAYER].cards.length == 2) {
            let card1 = this.hands[HAND_PLAYER].cards[0].num;
            let card2 = this.hands[HAND_PLAYER].cards[1].num;
            if (card1 == card2 && (card1 === 0 || card1 === 7)) {
                this.naturals = card1 + 1;
                return true;
            }
        }
        return false;
    }


    endHand() {
        this.scene = SCENE_DEALER;

        let handId = this.dealerType == DEALER_MUST ? HAND_DEALER : HAND_PLAYER;
        let rewardsCards = this.hands[HAND_PLAYER].cards.length;

        let player = this.getScore(HAND_PLAYER)
        let dealer = this.dealerType === DEALER_MUST ? this.getScore(HAND_DEALER) : this.dealerDice();

        let isNatural = this.isNatural()

        if (!isNatural && (player <= 20 && this.dealerType === DEALER_MUST)) {
            while (dealer < this.dealerMust && dealer < player) {

                this.addCard(HAND_DEALER)
                dealer = this.getScore(HAND_DEALER);
            }
        }

        // Calc cost after dealer hand is dealt
        let costCards = this.hands[handId].cards.length;
        let cost = this.bet * (costCards - 1);
        cost = cost < this.bet ? this.bet : cost;
        //cost = this.bet;

        let reward = this.bet * Math.pow(2, rewardsCards - 2);
        let win = false;
        if (isNatural) {
            reward = this.bet * 4;
            this.money += reward;
            win = true;
        }
        if (dealer > 20 && player <= 20) {
            this.money += reward;
            win = true;
        } else if (player > 20) {
            this.money -= cost;
        }
        else if (dealer > player) {
            this.money -= cost;
        } else if (dealer < player) {
            this.money += reward;
            win = true;
        } else {
            this.money -= cost;
        }

        this.message = `Last hand you had ${player} the dealer had ${dealer} you ${win ? 'won ' + reward : 'lost ' + cost}`

        this.buttons = [];

        setTimeout(() => {

            if (this.money <= 0) {
                this.sceneStart();
            } else {
                this.scenePlay();
            }
        }, 3000)
        this.draw();
    }


    draw() {
        this.ctx.fillStyle = gameTheme.base
        this.ctx.fillRect(0, 0, 1280, 1024)

        for (let button of this.buttons) {
            this.drawButton(button.label, button.x, button.y, button.w, button.h)
        }
        this.drawMessage();

        if (this.scene !== SCENE_START) {
            this.drawDealer();
            this.drawMoney();
            this.drawHand(HAND_PLAYER)
            if (this.naturals) {
                this.drawNaturals();
            }
        }

        this.screenctx.drawImage(this.prerender, 0, 0)
    }


    drawDealer() {
        let dealer = this.dealerDiceValue;
        if (this.dealerType === DEALER_MUST) {
            dealer = this.getScore(HAND_DEALER);
            this.drawHand(HAND_DEALER)
        } else if (this.scene != SCENE_DEALER) return;

        this.ctx.save();
        let score = `Dealer ${dealer}`
        this.ctx.font = '28px arial black';
        this.ctx.fillStyle = gameTheme.numStroke;
        this.ctx.fillText(score, 20, 130);
        this.ctx.restore();
    }

    drawMoney() {
        this.ctx.save();
        let score = `Money: ${this.money}`
        let bet = `Bet: ${this.bet}`
        this.ctx.textBaseline = "top"
        this.ctx.font = '28px arial black';
        this.ctx.lineWidth = gameTheme.numLine;
        this.ctx.fillStyle = gameTheme.numTextStroke;
        this.ctx.strokeStyle = gameTheme.numTextStroke;
        this.ctx.fillText(score, 500, 70);
        this.ctx.fillText(bet, 500, 120);
        this.ctx.restore();
    }

    drawMessage() {
        this.ctx.save();

        this.ctx.textBaseline = "top"
        this.ctx.font = '18px arial black';
        this.ctx.lineWidth = gameTheme.numLine;
        this.ctx.fillStyle = gameTheme.numTextStroke;
        this.ctx.strokeStyle = gameTheme.numTextStroke;
        this.ctx.fillText(this.message, 20, 10);

        this.ctx.restore();
    }

    drawNaturals() {
        this.ctx.save();
        let msg = "NATURAL WIN!!";
        this.ctx.textBaseline = "top"
        this.ctx.font = '96px arial black';
        this.ctx.lineWidth = gameTheme.numLine;
        this.ctx.fillStyle = gameTheme.numText;
        this.ctx.strokeStyle = gameTheme.numTextStroke;
        this.ctx.fillText(msg, 100, 300);
        this.ctx.strokeText(msg, 100, 300);
        this.ctx.restore();
    }

    drawHand(handId) {
        let hand = this.hands[handId];


        this.ctx.save();
        let score = this.getScore(handId);
        this.ctx.font = '48px arial black';
        this.ctx.lineWidth = gameTheme.numLine;
        this.ctx.fillStyle = gameTheme.numText;
        this.ctx.strokeStyle = gameTheme.numTextStroke;
        if (handId === HAND_PLAYER) {
            this.ctx.fillText(score, 120, 100);
            this.ctx.strokeText(score, 120, 100);
            this.ctx.translate(80, 150);
            this.ctx.scale(0.40, 0.40)
        } else {
            this.ctx.fillText(score, 620, 300);
            this.ctx.strokeText(score, 620, 300);
            this.ctx.translate(580, 350);
            this.ctx.scale(0.30, 0.30)
        }


        let y = 0;
        let offY = Render.szCanvas.h / 4;

        for (let card of hand.cards) {
            this.ctx.save();
            this.ctx.translate(0, offY * y);
            this.ctx.translate(Render.szCanvas.w / 2, Render.szCanvas.h / 2);
            this.ctx.rotate(45 * Math.PI / 180);
            this.ctx.translate(-Render.szCanvas.w / 2, -Render.szCanvas.h / 2);

            this.render.drawCard(cardTheme[card.color], card.num, card.type);
            y++;

            this.ctx.restore();
            if (this.scene === SCENE_PLAY && handId === HAND_DEALER) break;
        }
        this.ctx.restore();
    }

    shuffle() {
        let array = this.cards;
        if (this.cards.length < 2) return;

        let i = 0
            , j = 0
            , temp = null
        for (i = this.cards.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = this.cards[i]
            this.cards[i] = this.cards[j]
            this.cards[j] = temp
        }
        //m Test naturals this.cards.push(0,32,5,5,7,63,5,5,0,8,5,5,7,15);

        console.log('shuffling ', this.cards.length, 'cards')
    }


    dealerDice() {
        let dice = 0;
        if (this.dealerType === DEALER_DICE_D248) {
            dice = (Math.floor(Math.random() * 2) + 1)
                + (Math.floor(Math.random() * 4) + 1)
                + (Math.floor(Math.random() * 8) + 1);
            dice = dice > 14 ? 14 : dice;
            this.dealerDiceValue = 10 + dice;
        } else {
            dice = (Math.floor(Math.random() * 10) + 1);
            dice = dice > 10 ? 10 : dice;
            this.dealerDiceValue = 10 + dice;
        }


        return this.dealerDiceValue;
    }

    discardHands() {
        for (let hand of this.hands) {
            for (let card of hand.cards ? hand.cards : []) {
                this.discards.push(card.card);
            }
            hand.cards = []
        }
    }

    getScore(handId) {
        let hand = this.hands[handId];
        let multi = 1;
        let handScore = 0;
        let bitUp = 0;
        let bitDown = 0;
        for (let card of hand.cards) {
            bitUp += (card.type & 1) * multi;
            bitDown += ((card.type & 2) / 2) * multi;

            multi *= 2;
            handScore += card.num
            if (this.scene === SCENE_PLAY && handId === HAND_DEALER) break;
        }
        handScore += bitUp + bitDown;
        return handScore;
    }

    addCard(handId) {
        let hand = this.hands[handId];
        hand.cards.push(this.deal());
    }

    dealHands() {
        this.discardHands();
        for (let hand of this.hands) {
            for (let c = 0; c < this.handsize; c++) {
                if (!hand.cards) hand.cards = [];
                hand.cards.push(this.deal());
            }
        }
    }

    deal() {
        if (this.cards.length < 1) {
            this.cards = this.discards;
            this.discards = [];
            this.shuffle();
        }
        let card = this.cards.pop();

        let num = card & this.nummask;
        let type = (card & this.typemask) >> this.typeshift;
        let color = (card & this.colormask) >> this.colorshift;
        return { color: color, type: type, num: num, card: card }
    }

    buildDeck() {
        let end = this.startData.maxnum * this.startData.types * this.startData.colors;

        this.cards = [];
        this.discards = [];
        for (let x = 0; x < end; x++) {
            this.cards.push(x);
        }
    }
}

module.exports = PlayDeck



/***/ }),
/* 9 */
/***/ (function(module, exports) {

exports.draw = (ctx) => {
// #layer1
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(22.988047, 295.221510);
	ctx.bezierCurveTo(13.842927, 294.676450, 14.285437, 295.357520, 14.285437, 282.695080);
	ctx.lineTo(14.285437, 272.483570);
	ctx.lineTo(17.677967, 270.849610);
	ctx.bezierCurveTo(22.103047, 268.807310, 22.398027, 267.854210, 19.448007, 264.994930);
	ctx.bezierCurveTo(15.170437, 260.637900, 15.170437, 257.778620, 19.595517, 250.290180);
	ctx.bezierCurveTo(20.628017, 248.520110, 23.873067, 240.486920, 26.675607, 232.453730);
	ctx.bezierCurveTo(33.608197, 213.119620, 33.313187, 213.800390, 35.230717, 212.711180);
	ctx.bezierCurveTo(36.263227, 212.166120, 37.000747, 211.485760, 36.705737, 211.213430);
	ctx.bezierCurveTo(36.558237, 211.077420, 36.853237, 210.668380, 37.148237, 210.532360);
	ctx.bezierCurveTo(37.590727, 210.396350, 37.148237, 209.987310, 35.968227, 209.443060);
	ctx.bezierCurveTo(34.050707, 208.489960, 32.870677, 207.128630, 32.870677, 205.494770);
	ctx.bezierCurveTo(32.870677, 205.086730, 34.788207, 200.865410, 37.000747, 196.372270);
	ctx.bezierCurveTo(41.425797, 187.249770, 46.588377, 173.770440, 49.685897, 163.014080);
	ctx.bezierCurveTo(54.405987, 146.675470, 55.733497, 132.106830, 58.093517, 76.146916);
	ctx.lineTo(58.536017, 67.024517);
	ctx.lineTo(56.323487, 66.207435);
	ctx.bezierCurveTo(54.553447, 65.526366, 54.110957, 64.982014, 54.258457, 64.028920);
	ctx.bezierCurveTo(54.405957, 61.441966, 54.110957, 57.901917, 53.668467, 57.221150);
	ctx.bezierCurveTo(53.373467, 56.676093, 51.160927, 56.268056, 47.620877, 55.995729);
	ctx.bezierCurveTo(44.670837, 55.723704, 41.720807, 55.178647, 41.130797, 54.906522);
	ctx.bezierCurveTo(40.393307, 54.634497, 39.950777, 53.408875, 39.803267, 50.958033);
	ctx.bezierCurveTo(39.360767, 47.417984, 37.885747, 36.253183, 35.820727, 19.914574);
	ctx.bezierCurveTo(35.230717, 14.604450, 34.788207, 9.839081, 34.935707, 9.158314);
	ctx.bezierCurveTo(35.378217, 7.932893, 35.820727, 7.796679, 43.638337, 6.979799);
	ctx.bezierCurveTo(47.620887, 6.571762, 49.980917, 6.571762, 51.308447, 6.979799);
	ctx.bezierCurveTo(52.340957, 7.251824, 54.700977, 7.796881, 56.471017, 8.205220);
	ctx.bezierCurveTo(59.421057, 8.886289, 59.863557, 9.158314, 60.896067, 10.928288);
	ctx.bezierCurveTo(62.666097, 14.332224, 63.256107, 13.651356, 62.961097, 9.022100);
	ctx.bezierCurveTo(62.961097, 7.660566, 63.256097, 6.707472, 63.698587, 6.435145);
	ctx.bezierCurveTo(64.583577, 5.890088, 144.529680, 5.754076, 147.332220, 6.299133);
	ctx.bezierCurveTo(149.249740, 6.571158, 149.249740, 6.707170, 149.102240, 9.158415);
	ctx.bezierCurveTo(149.102240, 10.519949, 149.102240, 12.017596, 149.102240, 12.289923);
	ctx.bezierCurveTo(149.249730, 13.651457, 150.429770, 12.970992, 151.314780, 11.200716);
	ctx.bezierCurveTo(152.347290, 9.022201, 153.822320, 8.341434, 158.542380, 7.524453);
	ctx.bezierCurveTo(160.164900, 7.252428, 161.934920, 6.843384, 162.229930, 6.707371);
	ctx.bezierCurveTo(162.672420, 6.435347, 172.702570, 7.252428, 175.505110, 7.932792);
	ctx.bezierCurveTo(177.865140, 8.340829, 178.012650, 9.566653, 177.127630, 16.102097);
	ctx.bezierCurveTo(176.685140, 19.369819, 175.800120, 26.449917, 175.062600, 31.759940);
	ctx.bezierCurveTo(172.850070, 50.685605, 172.260060, 54.497981, 171.522550, 55.042635);
	ctx.bezierCurveTo(171.080060, 55.178647, 168.720020, 55.587692, 166.360000, 55.723704);
	ctx.bezierCurveTo(157.952370, 56.404773, 158.099880, 56.268761, 157.952370, 62.122934);
	ctx.bezierCurveTo(157.952370, 65.118430, 157.952370, 65.254543, 155.887350, 66.343750);
	ctx.lineTo(153.674820, 67.569171);
	ctx.lineTo(154.117310, 73.968502);
	ctx.bezierCurveTo(154.264810, 77.372437, 154.854800, 89.081791, 155.444830, 99.838051);
	ctx.bezierCurveTo(156.477360, 123.392970, 158.099880, 143.543960, 159.722390, 151.577150);
	ctx.bezierCurveTo(162.672430, 165.873460, 170.490050, 188.202960, 176.980120, 200.048530);
	ctx.bezierCurveTo(179.782660, 205.222540, 179.782660, 207.128730, 177.127620, 208.762390);
	ctx.bezierCurveTo(174.915090, 210.123920, 174.767580, 211.621670, 176.980120, 212.574760);
	ctx.bezierCurveTo(178.602660, 213.391850, 179.930170, 216.251030, 185.977740, 231.364220);
	ctx.bezierCurveTo(190.255290, 241.984460, 191.582820, 244.979860, 194.385360, 250.426100);
	ctx.bezierCurveTo(196.155390, 253.557600, 197.187900, 256.416890, 197.482910, 258.186860);
	ctx.bezierCurveTo(197.630400, 260.637700, 197.482910, 261.046140, 195.712870, 263.224660);
	ctx.bezierCurveTo(194.680370, 264.450080, 193.352850, 265.675500, 193.057830, 265.947830);
	ctx.bezierCurveTo(192.467840, 266.219850, 192.320340, 266.900920, 192.615340, 267.854010);
	ctx.bezierCurveTo(192.762840, 268.943220, 192.762840, 269.079430, 192.320340, 268.399070);
	ctx.bezierCurveTo(191.877850, 267.991030, 191.582850, 267.854010, 191.582850, 268.263060);
	ctx.bezierCurveTo(191.582850, 269.080140, 193.352880, 270.305460, 195.712900, 271.122340);
	ctx.bezierCurveTo(196.745430, 271.531380, 197.777930, 272.347760, 198.220440, 272.892410);
	ctx.bezierCurveTo(198.957930, 274.117840, 198.810430, 289.367140, 198.072940, 291.954190);
	ctx.bezierCurveTo(197.777940, 293.179510, 196.892930, 294.404930, 196.155420, 294.677260);
	ctx.bezierCurveTo(195.122910, 295.222320, 177.570160, 295.358330, 112.226770, 295.494340);
	ctx.bezierCurveTo(66.796167, 295.494340, 26.675607, 295.358330, 23.135547, 295.222320);


	ctx.restore();
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {


exports.draw = function (ctx) 	{
// #path21
	ctx.beginPath();
	ctx.lineWidth = 0.174425;
	ctx.moveTo(136.749820, 295.310500);
	ctx.bezierCurveTo(135.662470, 295.180260, 131.392160, 294.586130, 127.260250, 293.990080);
	ctx.bezierCurveTo(110.977360, 291.641190, 93.444953, 291.653600, 75.067564, 294.026980);
	ctx.bezierCurveTo(64.504081, 295.391240, 59.879368, 295.196910, 58.682404, 293.338510);
	ctx.bezierCurveTo(57.651611, 291.738100, 59.029677, 289.547780, 67.626073, 279.123270);
	ctx.bezierCurveTo(71.360418, 274.594780, 75.929857, 268.495500, 77.780372, 265.569350);
	ctx.bezierCurveTo(81.654770, 259.442880, 84.558716, 250.279880, 84.557752, 244.184110);
	ctx.bezierCurveTo(84.556968, 237.822410, 81.264148, 223.948460, 76.566615, 210.512300);
	ctx.bezierCurveTo(65.298807, 178.283450, 64.492156, 175.812360, 62.393561, 167.095670);
	ctx.bezierCurveTo(61.483907, 163.317330, 60.424444, 159.236710, 60.039174, 158.027640);
	ctx.bezierCurveTo(59.653927, 156.818570, 59.122884, 154.963740, 58.859089, 153.905820);
	ctx.bezierCurveTo(58.002314, 150.469650, 54.359638, 142.749520, 51.921100, 139.201670);
	ctx.bezierCurveTo(49.798610, 136.113700, 45.973779, 133.021900, 44.276101, 133.021900);
	ctx.bezierCurveTo(43.175100, 133.021900, 37.634770, 135.822420, 32.457360, 138.996060);
	ctx.bezierCurveTo(17.074781, 148.425230, 11.977330, 150.049250, 7.652570, 146.898730);
	ctx.bezierCurveTo(2.760273, 143.334770, 3.189187, 140.359870, 9.919870, 131.173030);
	ctx.bezierCurveTo(14.245056, 125.269530, 17.034477, 121.922940, 30.137651, 106.916960);
	ctx.bezierCurveTo(47.828036, 86.657594, 65.105825, 64.694951, 68.650629, 57.961174);
	ctx.bezierCurveTo(69.911037, 55.566903, 71.321607, 52.939281, 71.785244, 52.122029);
	ctx.bezierCurveTo(72.835621, 50.270515, 77.629947, 38.102293, 80.619084, 29.701329);
	ctx.bezierCurveTo(83.205151, 22.433191, 86.665941, 16.201980, 89.602682, 13.526173);
	ctx.bezierCurveTo(92.193045, 11.165987, 96.782341, 9.183769, 99.656428, 9.183769);
	ctx.bezierCurveTo(100.882220, 9.183769, 101.748990, 9.030632, 101.582570, 8.843549);
	ctx.bezierCurveTo(101.416240, 8.656434, 101.939480, 8.503344, 102.745510, 8.503344);
	ctx.bezierCurveTo(103.551510, 8.503344, 104.038170, 8.697655, 103.826960, 8.935151);
	ctx.bezierCurveTo(103.615800, 9.172646, 103.819960, 9.366958, 104.280420, 9.366958);
	ctx.bezierCurveTo(104.741030, 9.366958, 105.117890, 9.091217, 105.117890, 8.754174);
	ctx.bezierCurveTo(105.117890, 8.380180, 105.888250, 8.492190, 107.094880, 9.041630);
	ctx.bezierCurveTo(108.182230, 9.536765, 109.071890, 9.693750, 109.071890, 9.390466);
	ctx.bezierCurveTo(109.071890, 8.492081, 115.134520, 9.163891, 117.947970, 10.374035);
	ctx.bezierCurveTo(124.435680, 13.164578, 127.345860, 17.228982, 131.589850, 29.426538);
	ctx.bezierCurveTo(137.311130, 45.869957, 138.427980, 48.773663, 141.561330, 55.351514);
	ctx.bezierCurveTo(144.541940, 61.608711, 151.072240, 71.394050, 159.102710, 81.636402);
	ctx.bezierCurveTo(160.998640, 84.054539, 164.285660, 88.258807, 166.407210, 90.979215);
	ctx.bezierCurveTo(168.528740, 93.699624, 174.353390, 100.871610, 179.350890, 106.916960);
	ctx.bezierCurveTo(200.190640, 132.126300, 203.318970, 136.380120, 204.813440, 141.540340);
	ctx.bezierCurveTo(206.029710, 145.739930, 200.838530, 150.517490, 195.983160, 149.667060);
	ctx.bezierCurveTo(192.645120, 149.082390, 186.397370, 145.937110, 178.266730, 140.748110);
	ctx.bezierCurveTo(173.917350, 137.972330, 169.178230, 135.291930, 167.735350, 134.791680);
	ctx.bezierCurveTo(165.401570, 133.982550, 164.884110, 133.971160, 163.048210, 134.688550);
	ctx.bezierCurveTo(160.236220, 135.787370, 155.462390, 142.080170, 152.585790, 148.480030);
	ctx.bezierCurveTo(151.277800, 151.390060, 148.782030, 158.685710, 147.039660, 164.692560);
	ctx.bezierCurveTo(143.522580, 176.817770, 140.837440, 184.762590, 136.104500, 197.047660);
	ctx.bezierCurveTo(124.068950, 228.287840, 122.557390, 233.638190, 122.531120, 245.092850);
	ctx.bezierCurveTo(122.503120, 257.319000, 125.245900, 263.510150, 137.827420, 279.620020);
	ctx.bezierCurveTo(148.147070, 292.833670, 148.789320, 294.710130, 143.211620, 295.351090);
	ctx.bezierCurveTo(140.187320, 295.698640, 139.981490, 295.697340, 136.749820, 295.310390);
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

class Logic {
}
Logic.drawAND = (ctx,color) => {
	// #path3059
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(70.000000, 25.000000);
	ctx.bezierCurveTo(90.000000, 25.000000, 95.000000, 25.000000, 95.000000, 25.000000);
	ctx.stroke();

	// #path3061
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(31.000000, 15.000000);
	ctx.lineTo(5.000000, 15.000000);
	ctx.stroke();

	// #path3944
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(32.000000, 35.000000);
	ctx.lineTo(5.000000, 35.000000);
	ctx.stroke();

	// #path2884
	ctx.beginPath();
	ctx.lineWidth = 3.000000;
	ctx.fillStyle = color;
	ctx.moveTo(30.000000, 5.000000);
	ctx.lineTo(30.000000, 6.428571);
	ctx.lineTo(30.000000, 43.571429);
	ctx.lineTo(30.000000, 45.000000);
	ctx.lineTo(31.428571, 45.000000);
	ctx.lineTo(50.476190, 45.000000);
	ctx.bezierCurveTo(61.744098, 45.000000, 70.476190, 35.999955, 70.476190, 25.000000);
	ctx.bezierCurveTo(70.476190, 14.000045, 61.744099, 5.000000, 50.476190, 5.000000);
	ctx.bezierCurveTo(50.476190, 5.000000, 50.476190, 5.000000, 31.428571, 5.000000);
	ctx.moveTo(32.857143, 7.857143);
	ctx.bezierCurveTo(40.834264, 7.857143, 45.918368, 7.857143, 48.095238, 7.857143);
	ctx.bezierCurveTo(49.285714, 7.857143, 49.880952, 7.857143, 50.178571, 7.857143);
	ctx.bezierCurveTo(50.327381, 7.857143, 50.409227, 7.857143, 50.446429, 7.857143);
	ctx.bezierCurveTo(50.465029, 7.857143, 50.471539, 7.857143, 50.476189, 7.857143);
	ctx.bezierCurveTo(60.236853, 7.857143, 67.142857, 15.497098, 67.142857, 25.000000);
	ctx.bezierCurveTo(67.142857, 34.502902, 59.760662, 42.142857, 50.000000, 42.142857);
	ctx.lineTo(32.857143, 42.142857);
	ctx.fill();
}
Logic.drawNAND = (ctx, color) => {
	// #path3059
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(79.000000, 25.000000);
	ctx.bezierCurveTo(91.800000, 25.000000, 95.000000, 25.000000, 95.000000, 25.000000);
	ctx.stroke();

	// #path3061
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(31.000000, 15.000000);
	ctx.lineTo(5.000000, 15.000000);
	ctx.stroke();

	// #path3944
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(32.000000, 35.000000);
	ctx.lineTo(5.000000, 35.000000);
	ctx.stroke();

	// #path2884
	ctx.beginPath();
	ctx.lineWidth = 3.000000;
	ctx.fillStyle = color;
	ctx.moveTo(30.000000, 5.000000);
	ctx.lineTo(30.000000, 6.428571);
	ctx.lineTo(30.000000, 43.571429);
	ctx.lineTo(30.000000, 45.000000);
	ctx.lineTo(31.428571, 45.000000);
	ctx.lineTo(50.476190, 45.000000);
	ctx.bezierCurveTo(61.744098, 45.000000, 70.476190, 35.999955, 70.476190, 25.000000);
	ctx.bezierCurveTo(70.476190, 14.000045, 61.744099, 5.000000, 50.476190, 5.000000);
	ctx.bezierCurveTo(50.476190, 5.000000, 50.476190, 5.000000, 31.428571, 5.000000);
	ctx.moveTo(32.857143, 7.857143);
	ctx.bezierCurveTo(40.834264, 7.857143, 45.918368, 7.857143, 48.095238, 7.857143);
	ctx.bezierCurveTo(49.285714, 7.857143, 49.880952, 7.857143, 50.178571, 7.857143);
	ctx.bezierCurveTo(50.327381, 7.857143, 50.409227, 7.857143, 50.446429, 7.857143);
	ctx.bezierCurveTo(50.465029, 7.857143, 50.471539, 7.857143, 50.476189, 7.857143);
	ctx.bezierCurveTo(60.236853, 7.857143, 67.142857, 15.497098, 67.142857, 25.000000);
	ctx.bezierCurveTo(67.142857, 34.502902, 59.760662, 42.142857, 50.000000, 42.142857);
	ctx.lineTo(32.857143, 42.142857);
	ctx.fill();

	// #path4008
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.lineWidth = 3.000000;
	ctx.strokeStyle = color;
	ctx.arc(75.000000, 25.000000, 4.000000, 0.000000, 6.28318531, 1);
	ctx.stroke();

}
Logic.drawNOR = (ctx, color) => {
	// #path3059
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(79.000000, 25.000000);
	ctx.bezierCurveTo(99.000000, 25.000000, 95.000000, 25.000000, 95.000000, 25.000000);
	ctx.stroke();

	// #path3061
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(31.000000, 15.000000);
	ctx.lineTo(5.000000, 15.000000);
	ctx.stroke();

	// #path3944
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(32.000000, 35.000000);
	ctx.lineTo(5.000000, 35.000000);
	ctx.stroke();

	// #g2560
	ctx.save();
	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 26.500000, -39.500000);

	// #path4973
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.lineCap = 'butt';
	ctx.lineWidth = 3.000000;
	ctx.fillStyle = color;
	ctx.moveTo(-2.406250, 44.500000);
	ctx.lineTo(-0.406250, 46.937500);
	ctx.bezierCurveTo(-0.406250, 46.937500, 5.250000, 53.937549, 5.250000, 64.500000);
	ctx.bezierCurveTo(5.250000, 75.062451, -0.406250, 82.062500, -0.406250, 82.062500);
	ctx.lineTo(-2.406250, 84.500000);
	ctx.lineTo(0.750000, 84.500000);
	ctx.lineTo(14.750000, 84.500000);
	ctx.bezierCurveTo(17.158076, 84.500001, 22.439699, 84.524510, 28.375000, 82.093750);
	ctx.bezierCurveTo(34.310301, 79.662986, 40.911536, 74.750484, 46.062500, 65.218750);
	ctx.lineTo(44.750000, 64.500000);
	ctx.lineTo(46.062500, 63.781250);
	ctx.bezierCurveTo(35.759387, 44.715590, 19.506574, 44.500000, 14.750000, 44.500000);
	ctx.lineTo(0.750000, 44.500000);
	ctx.moveTo(3.468750, 47.500000);
	ctx.lineTo(14.750000, 47.500000);
	ctx.bezierCurveTo(19.434173, 47.500000, 33.036850, 47.369793, 42.718750, 64.500000);
	ctx.bezierCurveTo(37.951964, 72.929075, 32.197469, 77.183910, 27.000000, 79.312500);
	ctx.bezierCurveTo(21.639339, 81.507924, 17.158075, 81.500001, 14.750000, 81.500000);
	ctx.lineTo(3.500000, 81.500000);
	ctx.bezierCurveTo(5.373588, 78.391566, 8.250000, 72.450650, 8.250000, 64.500000);
	ctx.bezierCurveTo(8.250000, 56.526646, 5.341469, 50.599815, 3.468750, 47.500000);
	ctx.fill();

	// #path2604
	ctx.save();
	ctx.beginPath();
	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -26.500000, 39.500000);
	ctx.lineJoin = 'miter';
	ctx.lineWidth = 3.000000;
	ctx.strokeStyle = color;
	ctx.arc(75.000000, 25.000000, 4.000000, 0.000000, 6.28318531, 1);
	ctx.stroke();
	ctx.restore();
	ctx.restore();
}
Logic.drawOR = (ctx, color) => {
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(70.000000, 25.000000);
	ctx.bezierCurveTo(90.000000, 25.000000, 95.000000, 25.000000, 95.000000, 25.000000);
	ctx.stroke();
	
// #path3061
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(31.000000, 15.000000);
	ctx.lineTo(5.000000, 15.000000);
	ctx.stroke();
	
// #path3944
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.strokeStyle = color;
	ctx.lineCap = 'butt';
	ctx.lineWidth = 2.000000;
	ctx.moveTo(32.000000, 35.000000);
	ctx.lineTo(5.000000, 35.000000);
	ctx.stroke();
	
// #g2560
	ctx.save();
	ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 26.500000, -39.500000);
	
// #path4973
	ctx.beginPath();
	ctx.lineJoin = 'miter';
	ctx.lineCap = 'butt';
	ctx.lineWidth = 3.000000;
	ctx.fillStyle = color;
	ctx.moveTo(-2.406250, 44.500000);
	ctx.lineTo(-0.406250, 46.937500);
	ctx.bezierCurveTo(-0.406250, 46.937500, 5.250000, 53.937549, 5.250000, 64.500000);
	ctx.bezierCurveTo(5.250000, 75.062451, -0.406250, 82.062500, -0.406250, 82.062500);
	ctx.lineTo(-2.406250, 84.500000);
	ctx.lineTo(0.750000, 84.500000);
	ctx.lineTo(14.750000, 84.500000);
	ctx.bezierCurveTo(17.158076, 84.500001, 22.439699, 84.524510, 28.375000, 82.093750);
	ctx.bezierCurveTo(34.310301, 79.662986, 40.911536, 74.750484, 46.062500, 65.218750);
	ctx.lineTo(44.750000, 64.500000);
	ctx.lineTo(46.062500, 63.781250);
	ctx.bezierCurveTo(35.759387, 44.715590, 19.506574, 44.500000, 14.750000, 44.500000);
	ctx.lineTo(0.750000, 44.500000);
	ctx.moveTo(3.468750, 47.500000);
	ctx.lineTo(14.750000, 47.500000);
	ctx.bezierCurveTo(19.434173, 47.500000, 33.036850, 47.369793, 42.718750, 64.500000);
	ctx.bezierCurveTo(37.951964, 72.929075, 32.197469, 77.183910, 27.000000, 79.312500);
	ctx.bezierCurveTo(21.639339, 81.507924, 17.158075, 81.500001, 14.750000, 81.500000);
	ctx.lineTo(3.500000, 81.500000);
	ctx.bezierCurveTo(5.373588, 78.391566, 8.250000, 72.450650, 8.250000, 64.500000);
	ctx.bezierCurveTo(8.250000, 56.526646, 5.341469, 50.599815, 3.468750, 47.500000);
	ctx.fill();
	ctx.restore();
}

module.exports = Logic;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(0)
const Render = __webpack_require__(3)

const gameTheme = __webpack_require__(1)
const cardTheme = __webpack_require__(4)

const SCENE_START = 1;
const SCENE_PLAY = 2;
const SCENE_DEALER = 3;

const HAND_PLAYER = 0;
const HAND_DEALER = 1;

const LOGIC_OR = 0;
const LOGIC_AND = 1;
const LOGIC_NOR = 2;
const LOGIC_NAND = 3;



module.exports = class extends GameView {
    constructor(screenctx, colors, maxnum) {
        super()
        this.screenctx = screenctx

        this.nummask = 0b111;
        this.typemask = 0b11000;
        this.typeshift = 3;
        this.colormask = 0b111111100000;
        this.colorshift = 5;

        if (maxnum > 8) {
            this.nummask = 0b1111;
            this.typemask = 0b110000;
            this.typeshift = 4;
            this.colormask = 0b1111111000000;
            this.colorshift = 6;
        }

        this.gameButtons = [
            { label: "Banker", x: 520, y: 120, w: 200, h: 60, click: () => this.clickBanker() },
            { label: "Player", x: 120, y: 120, w: 200, h: 60, click: () => this.clickPlayer() },
            { label: "restart", x: 325, y: 800, w: 200, h: 60, click: () => this.sceneStart() }
        ]
        this.bankerButtons = [
            { label: "Banker", x: 520, y: 120, w: 200, h: 60, click: () => this.clickBanker() },
            { label: "Deal", x: 320, y: 100, w: 200, h: 60, click: () => this.clickDeal() },
            { label: "restart", x: 325, y: 800, w: 200, h: 60, click: () => this.sceneStart() }
        ]
        this.playerButtons = [
            { label: "Deal", x: 320, y: 100, w: 200, h: 60, click: () => this.clickDeal() },
            { label: "Player", x: 120, y: 120, w: 200, h: 60, click: () => this.clickPlayer() },
            { label: "restart", x: 325, y: 800, w: 200, h: 60, click: () => this.sceneStart() }
        ]
        this.redealButtons = [
            { label: "Redeal", x: 320, y: 100, w: 200, h: 60, click: () => this.clickRedeal() },
            { label: "restart", x: 325, y: 800, w: 200, h: 60, click: () => this.sceneStart() }
        ]


        let startY = 0
        this.startButtons = [
            { label: "gates hit", x: 300, y: startY += 80, w: 300, h: 60, click: () => this.clickGates(true) },
            { label: "gates nohit", x: 300, y: startY += 80, w: 300, h: 60, click: () => this.clickGates(false) },
            { label: "Rules", x: 300, y: startY += 80, w: 300, h: 60, click: () => window.location.replace('gates-info.html') },
        ]
        this.render = new Render(this.ctx);
        this.startData = { colors: colors, types: 4, maxnum: maxnum }
        this.sceneStart();
    }

    sceneStart() {
        this.buildDeck();
        this.shuffle();

        this.handsize = 2;
        this.hands = [{}, {}]

        this.scene = SCENE_START;
        this.buttons = this.startButtons
        this.money = 100;
        this.bet = 10;
        this.pot = 0;
        this.message = "Let's play!"
        this.draw();
    }

    clickBanker() {
        this.buttons = this.bankerButtons
        this.betOn = HAND_DEALER
        this.addToPot();
        this.draw();
    }
    addToPot() {
        this.pot += this.bet;
        if (this.pot > this.bet * 3) {
            this.pot = this.bet * 3;
        }
        if (this.pot > this.money) {
            this.pot = this.money;
        }
    }
    clickDeal() {
        this.endHand();
    }
    clickRedeal() {
        this.pot = 0;
        this.natural = false;

        if (this.money <= 0) {
            this.sceneStart();
        } else {
            this.scenePlay();
        }
    }
    clickPlayer() {
        this.betOn = HAND_PLAYER
        this.addToPot();
        this.buttons = this.playerButtons
        this.draw();
    }
    clickGates(hitRule) {
        this.hitRule = hitRule
        this.scenePlay();
    }
    scenePlay() {
        this.naturals = false;
        this.scene = SCENE_PLAY;
        this.buttons = this.gameButtons;
        this.dealHands();
        this.draw();
    }

    handSize(hand) {
        return this.hands[hand].cards.length;

    }


    endHand() {
        this.scene = SCENE_DEALER;
        this.addCard(HAND_PLAYER)
        this.addCard(HAND_DEALER)

        let player = this.getScore(HAND_PLAYER);
        let dealer = this.getScore(HAND_DEALER);
        if (this.hitRule) {
            let playerDraw = (player < 4) && (dealer < 6);
            let dealerDraw = dealer < 4;

            if (playerDraw) {
                this.addCard(HAND_PLAYER)
                let playerCard = this.addCard(HAND_PLAYER)
                let dealerDraws
                if (playerCard.num == 6 && dealer < 2) {
                    dealerDraw = true;
                } else if (playerCard.num == 4 || playerCard.num == 5 && dealer < 5) {
                    dealerDraw = true;
                } else if (playerCard.num == 2 || playerCard.num == 3 && dealer < 4) {
                    dealerDraw = true;
                } else if (playerCard.num == 7 || playerCard.num == 0 && dealer < 3) {
                    dealerDraw = true;
                }
            }
            if (dealerDraw) {
                this.addCard(HAND_DEALER)
                this.addCard(HAND_DEALER)
            }

            player = this.getScore(HAND_PLAYER);
            dealer = this.getScore(HAND_DEALER);
            this.natural = false;
            if ((this.handSize(HAND_DEALER) === 3) && (this.handSize(HAND_PLAYER) === 3)) {
                this.natural = true;   
            }
        }

        

        let cost = this.pot;
        let reward = this.pot;
        let playerWin = player > dealer;
        let win = false;

        if (!playerWin && this.betOn == HAND_DEALER) {
            this.money += reward
            win = true;
        } else if (playerWin && this.betOn == HAND_PLAYER) {
            this.money += reward
            win = true;
        }else  {
            this.money -= cost;
        }
        let betOn = this.betOn == HAND_PLAYER? "player" : "banker";

        this.message = `Last hand: player=${player}, banker=${dealer} you bet on the ${betOn} you ${win ? 'won ' + reward : 'lost ' + cost}`

        this.buttons = this.redealButtons;
        this.draw();
    }


    draw() {
        this.drawCls()
        this.drawButtons();

        this.drawMessage();

        if (this.scene !== SCENE_START) {
            this.drawMoney();
            this.drawHand(HAND_PLAYER)
            this.drawHand(HAND_DEALER)
            if (this.natural) {
                this.drawNaturals();
            }
        }

        this.screenctx.drawImage(this.prerender, 0, 0)
    }



    drawMoney() {
        this.ctx.save();
        let score = `Money: ${this.money}`
        let bet = `Bet: ${this.bet}\tPot: ${this.pot}`

        this.ctx.textBaseline = "top"
        this.ctx.font = '28px arial black';
        this.ctx.lineWidth = gameTheme.numLine;
        this.ctx.fillStyle = gameTheme.numTextStroke;
        this.ctx.strokeStyle = gameTheme.numTextStroke;
        this.ctx.fillText(score, 550, 50);
        this.ctx.fillText(bet, 150, 50);
        this.ctx.restore();
    }

    drawMessage() {
        this.ctx.save();

        this.ctx.textBaseline = "top"
        this.ctx.font = '18px arial black';
        this.ctx.lineWidth = gameTheme.numLine;
        this.ctx.fillStyle = gameTheme.numTextStroke;
        this.ctx.strokeStyle = gameTheme.numTextStroke;
        this.ctx.fillText(this.message, 20, 10);

        this.ctx.restore();
    }

    drawNaturals() {
        this.ctx.save();
        let msg = "NATURAL";
        this.ctx.textBaseline = "top"
        this.ctx.font = '96px arial black';
        this.ctx.lineWidth = gameTheme.numLine;
        this.ctx.fillStyle = gameTheme.numText;
        this.ctx.strokeStyle = gameTheme.numTextStroke;
        this.ctx.fillText(msg, 175, 420);
        this.ctx.strokeText(msg, 175, 420);
        this.ctx.restore();
    }

    drawHand(handId) {
        let hand = this.hands[handId];

        this.ctx.save();
        let score = this.getScore(handId);
        this.ctx.font = '48px arial black';
        this.ctx.lineWidth = gameTheme.numLine;
        this.ctx.fillStyle = gameTheme.numText;
        this.ctx.strokeStyle = gameTheme.numTextStroke;
        if (handId === HAND_PLAYER) {
            this.ctx.fillText(score, 100, 250);
            this.ctx.strokeText(score, 100, 250);
            this.ctx.translate(80, 250);
            this.ctx.scale(0.35, 0.35)
        } else {
            this.ctx.fillText(score, 500, 250);
            this.ctx.strokeText(score, 500, 250);
            this.ctx.translate(480, 250);
            this.ctx.scale(0.35, 0.35)
        }


        let y = 0;
        let offY = Render.szCanvas.h / 4;

        for (let card of hand.cards) {
            this.ctx.save();
            this.ctx.translate(0, offY * y);

            this.ctx.translate(Render.szCanvas.w / 2, Render.szCanvas.h / 2);
            this.ctx.rotate((y % 2 * 90 + 45) * Math.PI / 180);
            this.ctx.translate(-Render.szCanvas.w / 2, -Render.szCanvas.h / 2);

            this.render.drawCard(cardTheme[card.color], card.num, card.type);
            y++;

            this.ctx.restore();
        }
        this.ctx.restore();
    }

    shuffle() {
        let array = this.cards;
        if (this.cards.length < 2) return;

        let i = 0
            , j = 0
            , temp = null
        for (i = this.cards.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = this.cards[i]
            this.cards[i] = this.cards[j]
            this.cards[j] = temp
        }
        //m Test naturals this.cards.push(0,32,5,5,7,63,5,5,0,8,5,5,7,15);

        console.log('shuffling ', this.cards.length, 'cards')
    }

    discardHands() {
        for (let hand of this.hands) {
            for (let card of hand.cards ? hand.cards : []) {
                this.discards.push(card.card);
            }
            hand.cards = []
        }
    }

    getScore(handId) {
        let hand = this.hands[handId];
        let score = hand.cards[0].num;
        for (let i = 2; i < hand.cards.length; i += 2) {
            let opcode = hand.cards[i - 1].opcode;
            let operand = hand.cards[i].num;
            if (opcode == LOGIC_AND) {
                score = score & operand;
            } else if (opcode == LOGIC_NAND) {
                score = ~(score & operand);
            } else if (opcode == LOGIC_OR) {
                score = score | operand;
            } else if (opcode == LOGIC_NOR) {
                score = ~(score | operand);
            }
        }
        score = score & 7;
        return score;
    }

    addCard(handId) {
        let hand = this.hands[handId];
        let card = this.deal()
        hand.cards.push(card);
        return card;
    }

    dealHands() {
        this.discardHands();
        for (let hand of this.hands) {
            for (let c = 0; c < this.handsize; c++) {
                if (!hand.cards) hand.cards = [];
                hand.cards.push(this.deal());
            }
        }
    }

    deal() {
        if (this.cards.length < 1) {
            this.cards = this.discards;
            this.discards = [];
            this.shuffle();
        }
        let card = this.cards.pop();

        let num = card & this.nummask;
        let type = (card & this.typemask) >> this.typeshift;
        let color = (card & this.colormask) >> this.colorshift;
        let opcode = (num + type) % 4
        return { color: color, type: type, num: num, card: card, opcode: opcode }
    }

    buildDeck() {
        let end = this.startData.maxnum * this.startData.types * this.startData.colors;

        this.cards = [];
        this.discards = [];
        for (let x = 0; x < end; x++) {
            this.cards.push(x);
        }
    }
}





/*

    0    0    1   1
AND    
    0    1    0   1
    =================
    0    0    0   1

    0    0    1   1
OR    
    0    1    0   1
    =================
    0    1    1   1

    0    0    1   1
NOR    
    0    1    0   1
    =================
    1    0    0   0
    
*/

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "nibble-info.html";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "gates-info.html";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "games.html";

/***/ })
/******/ ]);