// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/sprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function Sprite(img, x, y, w, h) {
  _classCallCheck(this, Sprite);

  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};

exports.default = Sprite;
},{}],"src/bullet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bullet = /*#__PURE__*/function () {
  function Bullet(x, y, vx, vy, sprite, cnvsB, cnvsL, cnvsR) {
    _classCallCheck(this, Bullet);

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = sprite.w;
    this.h = sprite.h;
    this.sprite = sprite;
    this.cnvsB = cnvsB;
    this.isAlive = true;
    this.cnvsL = cnvsL;
    this.cnvsR = cnvsR;
  }

  _createClass(Bullet, [{
    key: "update",
    value: function update(time) {
      if (this.bottom() < this.cnvsB && this.y > 0 && this.left() > this.cnvsL && this.right() < this.cnvsR) {
        this.y += this.vy;
        this.x += this.vx;
      } else {
        this.isAlive = false;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var sp = this.sprite;
      ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, this.x, this.y, sp.w, sp.h);
    }
  }, {
    key: "left",
    value: function left() {
      return this.x;
    }
  }, {
    key: "right",
    value: function right() {
      return this.x + this.w;
    }
  }, {
    key: "top",
    value: function top() {
      return this.y;
    }
  }, {
    key: "bottom",
    value: function bottom() {
      return this.y + this.h;
    }
  }]);

  return Bullet;
}();

exports.default = Bullet;
},{}],"src/ship.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bullet = _interopRequireDefault(require("./bullet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ship = /*#__PURE__*/function () {
  function Ship(x, y, sprites, bulSprites, cnvsL, cnvsR) {
    _classCallCheck(this, Ship);

    this.x = x;
    this.y = y;
    this._sprites = sprites;
    this._bulSprites = bulSprites;
    this.w = sprites[0].w;
    this.h = sprites[0].h;
    this.cnvsL = cnvsL;
    this.cnvsR = cnvsR;
    this.hp = 2;
    this.mode = 0;
  }

  _createClass(Ship, [{
    key: "isAlive",
    value: function isAlive() {
      return this.hp > 0;
    }
  }, {
    key: "left",
    value: function left() {
      return this.x;
    }
  }, {
    key: "right",
    value: function right() {
      return this.x + this.w;
    }
  }, {
    key: "top",
    value: function top() {
      return this.y;
    }
  }, {
    key: "bottom",
    value: function bottom() {
      return this.y + this.h;
    }
  }, {
    key: "center",
    value: function center() {
      return this.x + this.w / 2;
    }
  }, {
    key: "intersects",
    value: function intersects(fig) {
      if (this.y < fig.bottom() && this.x < fig.right() && fig.x < this.right() && fig.y < this.bottom()) {
        this.hp -= 1;
        if (fig.hp === undefined) fig.isAlive = false;else fig.hp = fig.type != 3 ? 0 : fig.hp;
        return true;
      }

      return false;
    }
  }, {
    key: "trimMode",
    value: function trimMode(value) {
      this.mode = value < 0 ? Math.max(this.mode + value, 0) : Math.min(this.mode + value, 5);
    }
  }, {
    key: "shoot",
    value: function shoot(height) {
      var b1x = this.left() + 5;

      var b2x = this.right() - 5 - this._bulSprites[2].w;

      switch (this.mode) {
        case 0:
          return [new _bullet.default(this.center() - this._bulSprites[2].w / 2, this.y, 0, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)];

        case 1:
          return [new _bullet.default(b1x, this.y, 0, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b2x, this.y, 0, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)];

        case 2:
          return [new _bullet.default(this.center() - this._bulSprites[2].w / 2, this.y, 0, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b1x, this.y, -1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b2x, this.y, 1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)];

        case 3:
          return [new _bullet.default(this.center() - this._bulSprites[3].w / 2, this.y, 0, -8, this._bulSprites[3], height, this.cnvsL, this.cnvsR), new _bullet.default(b1x, this.y, -1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b2x, this.y, 1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)];

        case 4:
          return [new _bullet.default(this.center() - this._bulSprites[3].w / 2, this.y, 0, -8, this._bulSprites[3], height, this.cnvsL, this.cnvsR), new _bullet.default(b1x, this.y, -1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b2x, this.y, 1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b1x, this.y, -2, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b2x, this.y, 2, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)];

        case 5:
          return [new _bullet.default(this.center() - this._bulSprites[3].w / 2, this.y, 0, -8, this._bulSprites[3], height, this.cnvsL, this.cnvsR), new _bullet.default(b1x, this.y, -1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b2x, this.y, 1, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b1x, this.y, -2, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b2x, this.y, 2, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b1x, this.y, -3, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR), new _bullet.default(b2x, this.y, 3, -8, this._bulSprites[2], height, this.cnvsL, this.cnvsR)];

        default:
          break;
      }
    }
  }, {
    key: "move",
    value: function move(step) {
      if (step < 0 && this.x + step <= this.cnvsL || step > 0 && this.right() + step >= this.cnvsR) return;
      this.x += step;
    }
  }, {
    key: "draw",
    value: function draw(ctx, time) {
      var t = Math.ceil(time / 500) % 4;
      var sp = t === 3 ? this._sprites[1] : this._sprites[t];
      ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, this.x, this.y, sp.w, sp.h);
    }
  }]);

  return Ship;
}();

exports.default = Ship;
},{"./bullet":"src/bullet.js"}],"src/alien.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Alien = /*#__PURE__*/function () {
  function Alien(x, y, vx, vy, hp, type, sprites, timeMark, cnvsL, cnvsR, cnvsH) {
    _classCallCheck(this, Alien);

    this.x = x;
    this.y = y;
    this.type = type;
    this.vx = vx;
    this.vy = vy;
    this._sprites = sprites;
    this.w = Math.max.apply(Math, sprites.map(function (x) {
      return x.w;
    }));
    this.h = Math.max.apply(Math, sprites.map(function (x) {
      return x.h;
    }));
    this.timeMark = timeMark;
    this.timeLastFire = 0;
    this.hp = hp;
    this.difHP = hp;
    this.cnvsL = cnvsL;
    this.cnvsR = cnvsR;
    this.cnvsH = cnvsH;
  }

  _createClass(Alien, [{
    key: "isAlive",
    value: function isAlive() {
      return this.hp > 0;
    }
  }, {
    key: "left",
    value: function left() {
      return this.x;
    }
  }, {
    key: "top",
    value: function top() {
      return this.y;
    }
  }, {
    key: "right",
    value: function right() {
      return this.x + this.w;
    }
  }, {
    key: "bottom",
    value: function bottom() {
      return this.y + this.h;
    }
  }, {
    key: "alienFire",
    value: function alienFire(time) {
      if (Math.ceil(time / 100) % 60 === this.timeMark && time - this.timeLastFire > 2000) {
        //????
        this.timeLastFire = time;
        return true;
      }

      return false;
    }
  }, {
    key: "isInjured",
    value: function isInjured() {
      if (this.difHP > this.hp) {
        this.difHP = this.hp;
        return true;
      }

      return false;
    }
  }, {
    key: "intersects",
    value: function intersects(fig) {
      if (this.y < fig.bottom() && this.x < fig.right() && fig.x < this.right() && fig.y < this.bottom()) {
        this.hp -= 1;
        if (fig.hp === undefined) fig.isAlive = false;else fig.hp -= 1;
        return true;
      }

      return false;
    }
  }, {
    key: "center",
    value: function center() {
      return this.x + this.w / 2;
    }
  }, {
    key: "move",
    value: function move() {
      if (this.x <= this.cnvsL || this.right() >= this.cnvsR) this.vx = -this.vx;

      if (this.bottom() >= this.cnvsH && this.type != 3) {
        this.hp = 0;
        return;
      }

      this.x += this.vx;
      this.y += this.vy;
    }
  }, {
    key: "draw",
    value: function draw(ctx, time) {
      var t = Math.ceil(time / 500) % 4;
      var sp;

      switch (this.type) {
        case 0:
        case 3:
          sp = t === 3 ? this._sprites[1] : this._sprites[t];
          break;

        case 1:
          sp = this._sprites[t % 2];
          break;

        case 2:
          var shift = this.vx > 0 ? 3 : 0;
          sp = t === 3 ? this._sprites[shift + 1] : this._sprites[shift + t];
          break;
      }

      ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, this.x, this.y, sp.w, sp.h);
    }
  }]);

  return Alien;
}();

exports.default = Alien;
},{}],"src/input-handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputHandler = /*#__PURE__*/function () {
  function InputHandler() {
    var _this = this;

    _classCallCheck(this, InputHandler);

    this.down = {};
    this.pressed = {};
    document.addEventListener("keydown", function (e) {
      _this.down[e.keyCode] = true;
    });
    document.addEventListener("keyup", function (e) {
      delete _this.down[e.keyCode];
      delete _this.pressed[e.keyCode];
    });
  }
  /**
   * Returns whether a key is pressod down
   * @param  {number} code the keycode to check
   * @return {bool} the result from check
   */


  _createClass(InputHandler, [{
    key: "isDown",
    value: function isDown(code) {
      return this.down[code];
    }
    /**
     * Return wheter a key has been pressed
     * @param  {number} code the keycode to check
     * @return {bool} the result from check
     */

  }, {
    key: "isPressed",
    value: function isPressed(code) {
      // if key is registred as pressed return false else if
      // key down for first time return true else return false
      if (this.pressed[code]) {
        return false;
      } else if (this.down[code]) {
        return this.pressed[code] = true;
      }

      return false;
    }
  }]);

  return InputHandler;
}();

exports.default = InputHandler;
},{}],"src/level.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _alien = _interopRequireDefault(require("./alien"));

var _bullet = _interopRequireDefault(require("./bullet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Level = /*#__PURE__*/function () {
  function Level(typeLevel, countAlien, alienHP, movementSpeedVX, movementSpeedVY, alienSprites, bulletSprite, cnvsL, cnvsR, cnvsH) {
    _classCallCheck(this, Level);

    this.typeLevel = typeLevel;
    this.countAlien = countAlien;
    this.alienHP = alienHP;
    this.movementSpeedVX = movementSpeedVX;
    this.movementSpeedVY = movementSpeedVY;
    this.alienSprites = alienSprites;
    this.bulletSprite = bulletSprite;
    this.mark = 0;
    this.cnvsL = cnvsL;
    this.cnvsR = cnvsR;
    this.cnvsH = cnvsH;
    this.isEnd = false;
    this.isCDbyAlien = typeLevel == "falling" || typeLevel == "snake" || typeLevel == "boss";
    this.allAliens = [];
    this.aliens = [];
    this.idx = 0;
    this.lastTick = 0;
    this.tempYforBoss = 0;
    this.attackBoss = false;
    this.tempSpeedVXforBoss = 0;
  }

  _createClass(Level, [{
    key: "getMark",
    value: function getMark() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 17;
      this.mark = (this.mark + step) % 60;
      return this.mark;
    }
  }, {
    key: "randomX",
    value: function randomX() {
      var rand = this.cnvsL + Math.random() * (this.cnvsR - 50 - this.cnvsL);
      return Math.floor(rand);
    }
  }, {
    key: "constructorLevel",
    value: function constructorLevel() {
      var typeForm = 0;

      switch (this.typeLevel) {
        case "snake":
          typeForm = 2;

        case "formation":
          for (var k = 0; k < this.alienSprites.length; ++k) {
            for (var i = 0; i < this.countAlien; ++i) {
              var alienX = this.cnvsL + 40;
              var alienY = 40 + (k * this.countAlien + i) * 50;

              while (alienX + 60 < this.cnvsR) {
                this.aliens.push(new _alien.default(alienX, alienY, this.movementSpeedVX, this.movementSpeedVY, this.alienHP, typeForm, this.alienSprites[k], this.getMark(), this.cnvsL, this.cnvsR, this.cnvsH));
                alienX += 50;
              }
            }
          }

          break;

        case "falling":
          for (var _k = 0; _k < this.alienSprites.length; ++_k) {
            for (var _i = 0; _i < this.countAlien; ++_i) {
              var _alienX = this.randomX();

              var _alienY = 5;
              this.allAliens.push(new _alien.default(_alienX, _alienY, this.movementSpeedVX, this.movementSpeedVY, this.alienHP, 1, this.alienSprites[_k], this.getMark(), this.cnvsL, this.cnvsR, this.cnvsH));
            }
          }

          var ret = this.randomX() % 10;
          this.aliens = this.allAliens.slice(this.idx, this.idx + ret);
          this.idx += ret;
          break;

        case "boss":
          var tempXforBoss = (this.cnvsL + this.cnvsR) / 2;
          this.tempYforBoss = this.cnvsH / 4;
          this.aliens.push(new _alien.default(tempXforBoss, this.tempYforBoss, this.movementSpeedVX, 0, this.alienHP, 3, this.alienSprites[0], this.getMark(30), this.cnvsL, this.cnvsR, this.cnvsH));
          break;

        default:
          break;
      }
    }
  }, {
    key: "shoot",
    value: function shoot(time) {
      var _this = this;

      var bullet = [];

      switch (this.typeLevel) {
        case "formation":
          var alienIsReady = this.aliens.filter(function (x) {
            return x.alienFire(time);
          });
          alienIsReady.forEach(function (x) {
            var bulX = x.center();
            var bulY = x.bottom();
            bullet.push(new _bullet.default(bulX - _this.bulletSprite.w / 2, bulY, 0, 8, _this.bulletSprite, _this.cnvsH, _this.cnvsL, _this.cnvsR));
          });
          break;

        case "falling":
          break;

        case "snake":
          var alienInjured = this.aliens.filter(function (x) {
            return x.isInjured();
          });
          alienInjured.forEach(function (x) {
            var bulX = x.center();
            var bulY = x.bottom();
            bullet.push(new _bullet.default(bulX - _this.bulletSprite.w / 2, bulY, 0, 8, _this.bulletSprite, _this.cnvsH, _this.cnvsL, _this.cnvsR));
          });
          break;

        case "boss":
          if (this.aliens.length == 0) break;
          var boss = this.aliens[0];
          var bul1X = boss.left();
          var bul2X = boss.right() - this.bulletSprite.w;
          var bulY = boss.bottom();

          if (boss.alienFire(time) || boss.isInjured()) {
            bullet.push(new _bullet.default(bul1X, bulY, 0, 8, this.bulletSprite, this.cnvsH, this.cnvsL, this.cnvsR));
            bullet.push(new _bullet.default(bul2X, bulY, 0, 8, this.bulletSprite, this.cnvsH, this.cnvsL, this.cnvsR));
          }

          break;
      }

      return bullet;
    }
  }, {
    key: "getAlien",
    value: function getAlien() {
      this.aliens = this.aliens.filter(function (x) {
        return x.isAlive();
      });

      if (this.typeLevel == "falling") {
        this.isEnd = this.aliens.length == 0 && this.idx >= this.allAliens.length;
      } else this.isEnd = this.aliens.length == 0;
    }
  }, {
    key: "moveAlien",
    value: function moveAlien() {
      if (this.typeLevel == "boss") {}

      this.aliens.forEach(function (x) {
        return x.move();
      });
    }
  }, {
    key: "update",
    value: function update(time, shipLeft, shipRight) {
      switch (this.typeLevel) {
        case "formation":
          break;

        case "falling":
          if (this.idx < this.allAliens.length && time - this.lastTick > 1000) {
            var ret = this.randomX() % 6 + 1;
            var lastIdx = Math.min(this.allAliens.length, ret + this.idx);
            this.aliens = this.aliens.concat(this.allAliens.slice(this.idx, lastIdx));
            this.idx += ret;
            this.lastTick = time;
          }

          break;

        case "boss":
          var boss = this.aliens[0];

          if (shipLeft <= boss.center() && boss.center() < shipRight && boss.y == this.tempYforBoss) {
            this.tempSpeedVXforBoss = boss.vx;
            this.aliens[0].vx = 0;
            this.aliens[0].vy = this.movementSpeedVY;
            this.attackBoss = true;
          } else if (boss.bottom() >= this.cnvsH) {
            this.aliens[0].vx = 0;
            this.aliens[0].vy = -this.movementSpeedVY;
          } else if (boss.top() < this.tempYforBoss && this.attackBoss) {
            this.aliens[0].y = this.tempYforBoss;
            this.aliens[0].vx = this.tempSpeedVXforBoss;
            this.aliens[0].vy = 0;
            this.attackBoss = false;
          }

          break;

        default:
          break;
      }

      this.moveAlien();
    }
  }, {
    key: "drawAlien",
    value: function drawAlien(context, time) {
      this.aliens.forEach(function (a) {
        return a.draw(context, time);
      });
    }
  }]);

  return Level;
}();

exports.default = Level;
},{"./alien":"src/alien.js","./bullet":"src/bullet.js"}],"src/gift.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Gift = /*#__PURE__*/function () {
  function Gift(x, y, vy, sprite) {
    _classCallCheck(this, Gift);

    this.x = x;
    this.y = y;
    this.w = sprite.w;
    this.h = sprite.h;
    this.vy = vy;
    this.sprite = sprite;
    this.isAlive = true;
  }

  _createClass(Gift, [{
    key: "left",
    value: function left() {
      return this.x;
    }
  }, {
    key: "right",
    value: function right() {
      return this.x + this.w;
    }
  }, {
    key: "top",
    value: function top() {
      return this.y;
    }
  }, {
    key: "bottom",
    value: function bottom() {
      return this.y + this.h;
    }
  }, {
    key: "move",
    value: function move(cnvsB) {
      if (this.bottom() >= cnvsB) this.isAlive = false;else this.y += this.vy;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.sprite.img, this.sprite.x, this.sprite.y, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  }, {
    key: "intersects",
    value: function intersects(fig) {
      if (this.y < fig.bottom() && this.x < fig.right() && fig.x < this.right() && fig.y < this.bottom()) {
        this.isAlive = false;
        return true;
      }

      return false;
    }
  }]);

  return Gift;
}();

exports.default = Gift;
},{}],"assets/ship.png":[function(require,module,exports) {
module.exports = "/ship.0a8e5f48.png";
},{}],"assets/aliens.png":[function(require,module,exports) {
module.exports = "/aliens.495d16e8.png";
},{}],"src/conf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var config = {
  levels: [//1
  {
    typeLevel: "formation",
    typeAliens: [0],
    countAlien: 2,
    movementSpeedVX: 1,
    movementSpeedVY: 0,
    alienHP: 1,
    typeBullet: 0
  }, //2
  {
    typeLevel: "formation",
    typeAliens: [0, 1],
    countAlien: 2,
    movementSpeedVX: 1,
    movementSpeedVY: 0,
    alienHP: 1,
    typeBullet: 0
  }, //3
  {
    typeLevel: "falling",
    typeAliens: [5],
    countAlien: 60,
    movementSpeedVX: 0,
    movementSpeedVY: 8,
    alienHP: 3,
    typeBullet: 0
  }, //4
  {
    typeLevel: "snake",
    typeAliens: [6],
    countAlien: 2,
    movementSpeedVX: 2,
    movementSpeedVY: 0.2,
    alienHP: 2,
    typeBullet: 0
  }, //5	
  {
    typeLevel: "formation",
    typeAliens: [0, 1, 2],
    countAlien: 2,
    movementSpeedVX: 1,
    movementSpeedVY: 0,
    alienHP: 1,
    typeBullet: 0
  }, //6	
  {
    typeLevel: "falling",
    typeAliens: [5, 3],
    countAlien: 40,
    movementSpeedVX: 0,
    movementSpeedVY: 9,
    alienHP: 3,
    typeBullet: 0
  }, //7	
  {
    typeLevel: "snake",
    typeAliens: [6, 7],
    countAlien: 3,
    movementSpeedVX: 2.3,
    movementSpeedVY: 0.2,
    alienHP: 2,
    typeBullet: 0
  }, //8	
  {
    typeLevel: "formation",
    typeAliens: [0, 1, 2],
    countAlien: 3,
    movementSpeedVX: 2,
    movementSpeedVY: 0,
    alienHP: 1,
    typeBullet: 0
  }, //9	
  {
    typeLevel: "falling",
    typeAliens: [5, 3, 4],
    countAlien: 30,
    movementSpeedVX: 0,
    movementSpeedVY: 10,
    alienHP: 3,
    typeBullet: 0
  }, //10
  {
    typeLevel: "boss",
    typeAliens: [8],
    countAlien: 1,
    movementSpeedVX: 3,
    movementSpeedVY: 15,
    alienHP: 35,
    typeBullet: 1
  }]
};
exports.config = config;
},{}],"src/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preload = preload;
exports.initGame = initGame;
exports.update = update;
exports.draw = draw;

var _sprite = _interopRequireDefault(require("./sprite"));

var _ship = _interopRequireDefault(require("./ship"));

var _bullet = _interopRequireDefault(require("./bullet"));

var _alien = _interopRequireDefault(require("./alien"));

var _inputHandler = _interopRequireDefault(require("./input-handler"));

var _level = _interopRequireDefault(require("./level"));

var _gift = _interopRequireDefault(require("./gift"));

var _ship2 = _interopRequireDefault(require("../assets/ship.png"));

var _aliens = _interopRequireDefault(require("../assets/aliens.png"));

var _conf = require("./conf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assetShip;
var assetsAliens;
var sprites = {
  aliens: [],
  ship: [],
  bulletsShip: [],
  bulletsAliens: [],
  gift: null
};
var gameState = {
  startRun: null,
  cnvsBorder: 450,
  bullets: [],
  bulletsAlien: [],
  aliens: [],
  ship: null,
  levels: [],
  nextLevel: false,
  numberLevel: 0,
  startGame: true,
  gameOver: false,
  playerWin: false,
  score: 0,
  scoreLastBonus: 0,
  bonus: [],
  catchedBonus: 0
};

function onPressedKey(e) {
  if (e.keyCode === 13) {
    if (gameState.startGame) {
      gameState.startGame = false;
      levelLoop();
      return;
    }

    if (gameState.nextLevel) {
      gameState.numberLevel += 1;
      gameState.nextLevel = false;
      levelLoop();
      return;
    }

    if (gameState.playerWin || gameState.gameOver) {
      window.location.reload();
    }
  }
}

var mark = 0;
var inputHandler = new _inputHandler.default();

function preload(nextInit) {
  assetsAliens = new Image();
  assetsAliens.addEventListener("load", function () {
    sprites.bulletsAliens = [new _sprite.default(assetsAliens, 258, 20, 6, 16), new _sprite.default(assetsAliens, 279, 19, 11, 19)];
    sprites.aliens = [[new _sprite.default(assetsAliens, 2, 2, 47, 39), new _sprite.default(assetsAliens, 51, 2, 47, 39), new _sprite.default(assetsAliens, 99, 2, 44, 39)], //for 1, 2, 5, 8
    [new _sprite.default(assetsAliens, 1, 48, 47, 45), new _sprite.default(assetsAliens, 50, 48, 47, 45), new _sprite.default(assetsAliens, 98, 48, 44, 45)], // for 2, 5, 8
    [new _sprite.default(assetsAliens, 156, 146, 47, 45), new _sprite.default(assetsAliens, 204, 146, 47, 45), new _sprite.default(assetsAliens, 256, 146, 44, 45)], //for 5, 8 (complex)
    [new _sprite.default(assetsAliens, 152, 11, 47, 33), new _sprite.default(assetsAliens, 204, 11, 44, 33)], // for 6, 9
    [new _sprite.default(assetsAliens, 152, 53, 47, 33), new _sprite.default(assetsAliens, 204, 53, 44, 33)], // for 9
    [new _sprite.default(assetsAliens, 152, 93, 47, 33), new _sprite.default(assetsAliens, 204, 93, 44, 33)], // for 3, 6, 9
    [new _sprite.default(assetsAliens, 10, 101, 37, 39), new _sprite.default(assetsAliens, 58, 101, 37, 39), new _sprite.default(assetsAliens, 12, 193, 37, 43), //for 4, 7
    new _sprite.default(assetsAliens, 1, 148, 38, 40), new _sprite.default(assetsAliens, 53, 148, 38, 40), new _sprite.default(assetsAliens, 5, 241, 38, 43)], [new _sprite.default(assetsAliens, 106, 101, 37, 39), new _sprite.default(assetsAliens, 61, 195, 37, 39), new _sprite.default(assetsAliens, 109, 195, 37, 43), //for 7
    new _sprite.default(assetsAliens, 97, 147, 38, 40), new _sprite.default(assetsAliens, 56, 243, 38, 40), new _sprite.default(assetsAliens, 102, 243, 38, 43)], [new _sprite.default(assetsAliens, 306, 99, 92, 92), new _sprite.default(assetsAliens, 306, 191, 92, 92), new _sprite.default(assetsAliens, 306, 4, 92, 92)] // for 10
    ];
  });
  assetsAliens.src = _aliens.default;
  assetShip = new Image();
  assetShip.addEventListener("load", function () {
    sprites.ship = [new _sprite.default(assetShip, 2, 6, 55, 96), new _sprite.default(assetShip, 59, 6, 55, 96), new _sprite.default(assetShip, 117, 6, 55, 96)];
    sprites.bulletsShip = [new _sprite.default(assetShip, 178, 3, 5, 13), new _sprite.default(assetShip, 178, 18, 17, 14), new _sprite.default(assetShip, 179, 35, 10, 17), new _sprite.default(assetShip, 178, 53, 23, 24)];
    sprites.gift = new _sprite.default(assetShip, 202, 46, 31, 34);
    nextInit();
  });
  assetShip.src = _ship2.default;
}

function initGame(startRun, canvas) {
  gameState.cnvsBorder = ((canvas.width + 100) / 3 + 260) / 2; //load levels

  _conf.config.levels.forEach(function (level) {
    var alSp = [];
    level.typeAliens.forEach(function (x) {
      return alSp.push(sprites.aliens[x]);
    });
    gameState.levels.push(new _level.default(level.typeLevel, level.countAlien, level.alienHP, level.movementSpeedVX, level.movementSpeedVY, alSp, sprites.bulletsAliens[level.typeBullet], canvas.width / 2 - gameState.cnvsBorder, canvas.width / 2 + gameState.cnvsBorder, canvas.height));
  }); //init ship


  gameState.ship = new _ship.default(canvas.width / 2 - gameState.cnvsBorder + 10, canvas.height - 200, sprites.ship, sprites.bulletsShip, canvas.width / 2 - gameState.cnvsBorder, canvas.width / 2 + gameState.cnvsBorder);
  gameState.startRun = startRun;
  window.addEventListener('keydown', onPressedKey, true);
}

function levelLoop() {
  gameState.levels[gameState.numberLevel].constructorLevel();
  gameState.ship.hp += 1;
  gameState.bullets = [];
  gameState.bulletsAlien = [];
  gameState.bonus = [];
  gameState.startRun();
}

function randomX(cnvsL, cnvsR) {
  var rand = cnvsL + Math.random() * (cnvsR - 50 - cnvsL);
  return Math.floor(rand);
}

function update(time, stopGame, canvas) {
  if (inputHandler.isDown(37)) {
    // Left
    gameState.ship.move(-4);
  }

  if (inputHandler.isDown(39)) {
    // Right
    gameState.ship.move(4);
  }

  if (inputHandler.isPressed(32)) {
    // Space
    gameState.bullets = gameState.bullets.concat(gameState.ship.shoot(canvas.height));
  }

  if (gameState.scoreLastBonus != Math.floor(gameState.score / 70)) {
    gameState.bonus.push(new _gift.default(randomX(canvas.width / 2 - gameState.cnvsBorder, canvas.width / 2 + gameState.cnvsBorder), 40, 6, sprites.gift));
    gameState.scoreLastBonus = Math.floor(gameState.score / 70);
  }

  gameState.bonus.forEach(function (g) {
    if (g.intersects(gameState.ship)) {
      gameState.catchedBonus += 1;
      if (gameState.catchedBonus % 3 == 0) gameState.ship.trimMode(1);
      if (gameState.catchedBonus % 7 == 0) gameState.ship.hp += 1;
    }

    g.move(canvas.height);
  });
  var level = gameState.levels[gameState.numberLevel];
  gameState.bulletsAlien = gameState.bulletsAlien.concat(level.shoot(time));
  gameState.bullets.forEach(function (b) {
    b.update(time);
    level.aliens.forEach(function (x) {
      if (x.intersects(b)) gameState.score += 5;
    });
  });
  level.getAlien();

  if (level.isCDbyAlien) {
    level.aliens.forEach(function (x) {
      if (gameState.ship.intersects(x)) gameState.ship.trimMode(-2);
    });
  }

  gameState.bulletsAlien.forEach(function (b) {
    b.update(time);

    if (gameState.ship.intersects(b)) {
      gameState.ship.trimMode(-1);
    }

    ;
  });

  if (!gameState.ship.isAlive()) {
    gameState.gameOver = true;
    stopGame();
  }

  if (level.isEnd) {
    if (gameState.numberLevel + 1 == gameState.levels.length) {
      gameState.playerWin = true;
    } else {
      gameState.nextLevel = true;
      stopGame();
    }
  }

  level.update(time, gameState.ship.left(), gameState.ship.right());
  gameState.bulletsAlien = gameState.bulletsAlien.filter(function (b) {
    return b.isAlive;
  });
  gameState.bullets = gameState.bullets.filter(function (b) {
    return b.isAlive;
  });
  gameState.bonus = gameState.bonus.filter(function (g) {
    return g.isAlive;
  });
}

function drawSwitchLevel(canvas) {
  var context = canvas.getContext('2d');
  context.font = "64px serif";
  context.fillStyle = "#FFFFFF";
  context.fillText("Level " + (gameState.numberLevel + 2), canvas.width / 2 - 110, canvas.height / 2 - 150);
  context.font = "48px serif";
  context.fillText("Press Enter for start", canvas.width / 2 - 185, canvas.height / 2);
}

function drawWin(canvas) {
  var context = canvas.getContext('2d');
  context.font = "64px serif";
  context.fillStyle = "#FFFFFF";
  context.fillText("Congratulation!", canvas.width / 2 - 200, canvas.height / 2 - 150);
  context.fillText("You won", canvas.width / 2 - 120, canvas.height / 2 - 70);
  context.font = "48px serif";
  context.fillText("Your score: " + gameState.score, canvas.width / 2 - 155, canvas.height / 2 - 10);
  context.fillText("Press Enter for repeat", canvas.width / 2 - 200, canvas.height / 2 + 80);
}

function drawGameOver(canvas) {
  var context = canvas.getContext('2d');
  context.font = "64px serif";
  context.fillStyle = "#FFFFFF";
  context.fillText("You died", canvas.width / 2 - 120, canvas.height / 2 - 150);
  context.font = "48px serif";
  context.fillText("Your score: " + gameState.score, canvas.width / 2 - 155, canvas.height / 2 - 90);
  context.fillText("Level: " + (gameState.numberLevel + 1), canvas.width / 2 - 80, canvas.height / 2 - 30);
  context.fillText("Press Enter for repeat", canvas.width / 2 - 200, canvas.height / 2 + 60);
}

function draw(canvas, time) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (gameState.nextLevel) {
    drawSwitchLevel(canvas);
    return;
  }

  if (gameState.playerWin) {
    drawWin(canvas);
    return;
  }

  if (gameState.gameOver) {
    drawGameOver(canvas);
    return;
  }

  var cnvsL = canvas.width / 2 - gameState.cnvsBorder;
  var cnvsR = canvas.width / 2 + gameState.cnvsBorder; //borders

  context.beginPath();
  context.strokeStyle = "#FFFFFF";
  context.moveTo(cnvsL, 0);
  context.lineTo(cnvsL, canvas.height);
  context.moveTo(cnvsR, 0);
  context.lineTo(cnvsR, canvas.height);
  context.closePath();
  context.stroke(); //info

  context.font = "48px serif";
  context.fillStyle = "#FFFFFF";
  context.fillText("Level " + (gameState.numberLevel + 1), cnvsL / 2 - 65, 150);
  context.font = "40px serif";
  context.fillText("Score " + gameState.score, cnvsL / 2 - 65, 200);
  context.drawImage(sprites.gift.img, sprites.gift.x, sprites.gift.y, sprites.gift.w, sprites.gift.h, (cnvsR + canvas.width) / 2 - sprites.gift.w - 10, canvas.height - 3 * sprites.ship[0].h, sprites.gift.w, sprites.gift.h);
  context.fillText(gameState.catchedBonus, (cnvsR + canvas.width) / 2 + sprites.gift.w - 10, canvas.height - 2.65 * sprites.ship[0].h);
  context.drawImage(sprites.ship[0].img, sprites.ship[0].x, sprites.ship[0].y, sprites.ship[0].w, sprites.ship[0].h, (cnvsR + canvas.width) / 2 - sprites.ship[0].w + 1, canvas.height - 2 * sprites.ship[0].h, sprites.ship[0].w, sprites.ship[0].h);
  context.fillText(gameState.ship.hp, (cnvsR + canvas.width) / 2 + sprites.gift.w - 10, canvas.height - 1.3 * sprites.ship[0].h);
  gameState.levels[gameState.numberLevel].drawAlien(context, time);
  gameState.bonus.forEach(function (g) {
    return g.draw(context);
  });
  gameState.ship.draw(context, time);
  gameState.bullets.forEach(function (b) {
    return b.draw(context);
  });
  gameState.bulletsAlien.forEach(function (b) {
    return b.draw(context);
  });
}
},{"./sprite":"src/sprite.js","./ship":"src/ship.js","./bullet":"src/bullet.js","./alien":"src/alien.js","./input-handler":"src/input-handler.js","./level":"src/level.js","./gift":"src/gift.js","../assets/ship.png":"assets/ship.png","../assets/aliens.png":"assets/aliens.png","./conf":"src/conf.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _game = require("./game");

var canvas = document.getElementById("cnvs");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var tickLength = 15; //ms

var lastTick;
var lastRender;
var stopCycle;

function run(tFrame) {
  stopCycle = window.requestAnimationFrame(run);
  var nextTick = lastTick + tickLength;
  var numTicks = 0;

  if (tFrame > nextTick) {
    var timeSinceTick = tFrame - lastTick;
    numTicks = Math.floor(timeSinceTick / tickLength);
  }

  for (var i = 0; i < numTicks; i++) {
    lastTick = lastTick + tickLength;
    (0, _game.update)(lastTick, stopGame, canvas);
  }

  (0, _game.draw)(canvas, tFrame);
  lastRender = tFrame;
}

function stopGame() {
  window.cancelAnimationFrame(stopCycle);
}

function onPreloadComplete() {
  lastTick = performance.now();
  lastRender = lastTick;
  stopCycle = null;
  run();
}

function drawGameStart(context) {
  context.font = "64px serif";
  context.fillStyle = "#FFFFFF";
  context.fillText("Space Invaders", canvas.width / 2 - 195, canvas.height / 2 - 170);
  context.font = "48px serif";
  context.fillText("(Special Edition)", canvas.width / 2 - 150, canvas.height / 2 - 110);
  context.fillText("Press Enter for start", canvas.width / 2 - 185, canvas.height / 2);
}

function nextInit() {
  drawGameStart(canvas.getContext('2d'));
  (0, _game.initGame)(onPreloadComplete, canvas);
}

(0, _game.preload)(nextInit);
},{"./game":"src/game.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53568" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map