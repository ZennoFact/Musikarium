phina.globalize();

// Let
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var startingPoint = new Vector2( SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
var PARTICLE_NUM = COUNT_X; // 1200
var DOT_NUM = COUNT_XX; // 20 MAX70
var FRICTION = 0.96;
var PARTICLE_SIZE = 4;

var TO_DIST = SCREEN_WIDTH * 0.92;
// var STIR_DIST = SCREEN_WIDTH * 0.125;
var BLOW_DIST = SCREEN_WIDTH * 0.25;


var BLOW_RATE = 0.5;
var isBlow = false;
var isMouse = false;
var DISTANCE = 300;

var mode = 0;
var GRAVITY = 0.98;
var isBlack = false;



// MainScene
phina.define('MainScene', {
    superClass: 'DisplayScene',
    init: function() {
        this.interval = 5;
        this.countdown = this.interval;
        this.keycount = 1;
        this.gramophone = 0;

        this.superInit({
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
        });
        this.backgroundColor = '#242424';

        // 背景用パーティクルの生成
        this.backGroup = DisplayElement().addChildTo(this);

        (DOT_NUM).times(function (i) {
            var dot = BackDot({
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                stroke: '#484848',
                strokeWidth: 1,
            }).addChildTo(this.backGroup);
            // dot.x += 0;
            // dot.y += 0;
            dot.index = i;
            dot.origin.set(0, 0);
        }, this);
        var array = this.backGroup.children;
        this.backGroup.children.forEach(function(value, i) {
            value.targets = array.slice(i + 1, array.length);
        });


        // ラベルを生成
        this.label = Code('').addChildTo(this);
        this.label.x = this.gridX.center(); // x 座標
        this.label.y = this.gridY.center(); // y 座標
        // this.label.fill = '#323232'; // 塗りつぶし色

        // グループの生成
        this.group = DisplayElement().addChildTo(this);

        // Create particle
        (PARTICLE_NUM).times(function(i) {
            var color = "hsla({0}, 75%, 50%, 1)".format(Math.randint(0, 360));
            var p = Particle(color).addChildTo(this.group);
            p.x = Math.randint(0, this.gridX.width);
            p.y = Math.randint(0, this.gridY.width);
            p.index = i;
        }, this);

        // chine
        this.group.children.reduce(function(prev, current) {
            current.target = prev;
            return current;
        }, null);

        // socket.io connection TODO　IPアドレスの設定 localhost不可
        this.socket = io.connect('http://localhost:3000');

        this.socket.on("connected", function (data) {
          console.log(data);
        });

        var self = this;
        this.socket.on("sound", function (data) {
          // console.log(data.key);

          // 変更箇所
          self.gramophone = parseInt(data.key);
          self.keycount++;
          if (data.key === 16) { // TODO 押しっぱなしの時だけに変更
              isBlack = true;
          }

        });
    },

    onkeydown: function(e) {
        // console.log(e.keyCode);
        this.socket.emit('connected', e.keyCode);

        if (e.keyCode === 32) {
            // this.app.stop();
            if (isMouse) {
                isMouse = false;
                e.target.app.interactive.cursor.normal = 'none';
            }
            else {
                isMouse = true;
                e.target.app.interactive.cursor.normal = '';
            }
        } else if (e.keyCode === 16) { // TODO 押しっぱなしの時だけに変更
            isBlack = true;
        }

    },

    onkeyup: function (e) {
        if (e.keyCode === 16) {
            isBlack = false;
        }
    },

    update: function () {
        for (var i = 0; i < this.backGroup.children.length; i++) {
            this.backGroup.getChildAt(i)._dirtyDraw = true;
        }

        this.countdown--;

        var gramophone = this.gramophone;
        var keycount = this.keycount;

        if (this.countdown <= 0) {

          if (keycount > 1) keycount -= 1;

          var key = parseInt(gramophone / keycount);

          switch (gramophone % 6) {
            case 1:
            startingPoint = new Vector2( DISTANCE, DISTANCE);
            break;
            case 2:
            startingPoint = new Vector2( DISTANCE, SCREEN_HEIGHT - DISTANCE);
                  break;
              case 3:
                  startingPoint = new Vector2( SCREEN_WIDTH - DISTANCE, DISTANCE);
                  break;
              case 4:
                  startingPoint = new Vector2( SCREEN_WIDTH - DISTANCE, SCREEN_HEIGHT - DISTANCE);
                  break;
              default:
                  startingPoint = new Vector2( SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
                  break;
          }

          // TODO 毎回mode0に戻る必要はあるのか
          switch (gramophone % 10) { // 13
              case 1:
                  mode = 1;
                  break;
              case 2:
                  mode = 2;
                  break;
              case 3:
                  mode = 3;
                  break;
              case 4:
                  mode = 4;
                  break;
              case 5:
                  mode = 5;
                  break;
              case 6:
                  mode = 6;
                  break;
              default:
                  mode = 0;
                  break;
          }

          if (gramophone === 0) {

          } else if (keycount > 100) {
            // console.log('in key:' + key);
              key = key % 15;

              triad(harmonyArray[key]);

              if (isBlow) isBlow = false;
              else isBlow = true;

          } else {
            // console.log('score');
            key %= 32;
            // console.log(key);
            singleScale2(key);

            if (isBlow) isBlow = false;
            else isBlow = true;
          }

          this.countdown = this.interval;
          this.keycount = 1;
          this.gramophone = 0;
        }
    },

});

phina.main(function() {
    var app = GameApp({
        startLabel: 'main',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    });

    // app.enableStats();

    app.fitScreen();

    app.interactive.cursor.normal = 'none';
    app.interactive.cursor.hover = 'none';

    app.run();
});
