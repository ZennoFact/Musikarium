phina.globalize();

/*
 * Particle
 */
phina.define('Particle', {
    superClass: 'StarShape',
    init: function(color) {
        this.superInit({
            fill: color,
            stroke: null,
            radius: PARTICLE_SIZE,
        });
        this.v = Vector2(0, 0);
        this.blendMode = 'lighter';
    },

    update: function(app) {
        var p;
        if(isMouse) p = app.pointer;
        else p = startingPoint;

        if (mode === 0) {
            var dv = Vector2.sub(this, p);
            var d = dv.length() || 0.001;
            dv.div(d); // normalize

            // 反発
            // if (p.getPointing()) {
            if (isBlow) {
                if (d < BLOW_DIST) {
                    var blowAcc = ( 1 - (d / BLOW_DIST) ) * 14;
                    this.v.x += dv.x * blowAcc + BLOW_RATE - Math.random();
                    this.v.y += dv.y * blowAcc + BLOW_RATE - Math.random();
                }
            }

            // TODO こいつがある中心が移らなくなった。調査
            // if (d<STIR_DIST) {
            //     var mAcc = ( 1 - (d / STIR_DIST) * SCREEN_WIDTH * 0.00026 );
            //     this.v.x += p.dx * mAcc * 0.1;
            //     this.v.y += p.dy * mAcc * 0.1;
            // }


        } else if (mode === 1) { // Double

            var dv = Vector2.sub(this, p);
            var d = dv.length() || 0.001;
            dv.div(d); // normalize
            // this.v.x;
            // this.v.y;
            if (isBlow) {
                if (d < BLOW_DIST) {
                    // TODO ここ，なんとかしなきゃ
                    var blowAcc = ( 1 - (d / BLOW_DIST) ) * 2;
                    this.v.x -= dv.x * blowAcc + BLOW_RATE - Math.random();
                    this.v.y += dv.y * blowAcc + BLOW_RATE - Math.random();
                }
            }

        } else if (mode === 2) { // Fold

            if (isBlow) this.v.y -= GRAVITY;
            else this.v.y += GRAVITY;

            this.position.add(this.v);
        } else if (mode === 3) { // Horizontal Spiral
            // 2点間の距離を出す
            var r = Math.sqrt( Math.pow((p.x - this.x), 2) + Math.pow((p.y - this.y), 2) );
            // 2点間の角度を出す
            var rad = Math.atan2( (this.y - p.y), (this.x - p.x) );
            var difRad = Math.degToRad(-2);

            // 新しい座標を決定する & 原点(0, 0)からのずれを補正
            var x = (r) * Math.cos(rad + difRad) + p.x;
            var y = (r - 100) * Math.sin(rad + difRad) + p.y;

            p = Vector2(x, y);
            var dv = Vector2.sub(this, p);
            var d = dv.length() || 0.001;
            dv.div(d); // normalize

            // TODO 実験中
            if (isBlow) {
                if (d < BLOW_DIST) {
                    var blowAcc = ( 1 - (d / BLOW_DIST) ) * 2;
                    this.v.x += dv.x * blowAcc + BLOW_RATE - Math.random();
                    this.v.y -= dv.y * blowAcc + BLOW_RATE - Math.random();
                }
            }

        }  else if (mode === 4) { // Vertical Spiral
// 2点間の距離を出す
            var r = Math.sqrt( Math.pow((p.x - this.x), 2) + Math.pow((p.y - this.y), 2) );
            // 2点間の角度を出す
            var rad = Math.atan2( (this.y - p.y), (this.x - p.x) );
            var difRad = Math.degToRad(-2);

            // 新しい座標を決定する & 原点(0, 0)からのずれを補正
            var x = (r - 100) * Math.cos(rad + difRad) + p.x;
            var y = (r) * Math.sin(rad + difRad) + p.y;

            p = Vector2(x, y);
            var dv = Vector2.sub(this, p);
            var d = dv.length() || 0.001;
            dv.div(d); // normalize

            if (isBlow) {
                if (d < BLOW_DIST) {
                    var blowAcc = ( 1 - (d / BLOW_DIST) ) * 2;
                    this.v.x -= dv.x * blowAcc + BLOW_RATE - Math.random();
                    this.v.y += dv.y * blowAcc + BLOW_RATE - Math.random();
                }
            }

        } else if (mode === 5) { // Spiral
            // 2点間の距離を出す
            var r = Math.sqrt( Math.pow((p.x - this.x), 2) + Math.pow((p.y - this.y), 2) );
            // 2点間の角度を出す
            var rad = Math.atan2( (this.y - p.y), (this.x - p.x) );
            var difRad = Math.degToRad(2);

            // 新しい座標を決定する & 原点(0, 0)からのずれを補正
            var x = (r - 40) * Math.cos(rad + difRad) + p.x;
            var y = (r - 40) * Math.sin(rad + difRad) + p.y;

            p = Vector2(x, y);
            var dv = Vector2.sub(this, p);
            var d = dv.length() || 0.001;
            dv.div(d); // normalize

            // TODO 実験中
            if (isBlow) {
                if (d < BLOW_DIST) {
                    var blowAcc = ( 1 - (d / BLOW_DIST) ) * 2;
                    this.v.x += dv.x * blowAcc + BLOW_RATE - Math.random();
                    this.v.y += dv.y * blowAcc + BLOW_RATE - Math.random();
                }
            }

        } else if (mode === 6) { // Wave Circle
            // 2点間の距離を出す
            var r = Math.sqrt( Math.pow((p.x - this.x), 2) + Math.pow((p.y - this.y), 2) );
            // 2点間の角度を出す
            var rad = Math.atan2( (this.y - p.y), (this.x - p.x) );
            var difRad = Math.degToRad(2);

            // 新しい座標を決定する & 原点(0, 0)からのずれを補正
            var x = (r - 10) * Math.cos(rad + difRad) + p.x;
            var y = (r - 10) * Math.sin(rad + difRad) + p.y;

            p = Vector2(x, y);
            var dv = Vector2.sub(this, p);
            var d = dv.length() || 0.001;
            dv.div(d); // normalize

            // TODO 実験中
            if (isBlow) {
                if (d < BLOW_DIST) {
                    var blowAcc = ( 1 - (d / BLOW_DIST) ) * 2;
                    this.v.x += dv.x * blowAcc + BLOW_RATE - Math.random();
                    this.v.y += dv.y * blowAcc + BLOW_RATE - Math.random();
                }
            }
        }

        // ここから共通の処理

        // 距離が一定以内だと速度を調整
        if (d < TO_DIST) {
            var toAcc = ( 1 - (d / TO_DIST) ) *  SCREEN_WIDTH * 0.0006;
            this.v.x -= dv.x * toAcc;
            this.v.y -= dv.y * toAcc;
        }

        // 摩擦
        this.v.mul(FRICTION);
        // 移動
        this.position.add(this.v);


        // Scale
        var scale = this.v.lengthSquared() * 0.04;
        scale = Math.clamp(scale, 0.75, 2);
        this.scaleX = this.scaleY = scale;

        // rotate
        this.rotation += scale * 10;



        // Sceneからのはみだしを禁止
        if (this.x > SCREEN_WIDTH - PARTICLE_SIZE) {
            this.x = SCREEN_WIDTH - PARTICLE_SIZE;
            this.v.x *= -1;
        } else if (this.x < 0) {
            this.x = 0;
            this.v.x *= -1;
        } else if (this.y > SCREEN_HEIGHT - PARTICLE_SIZE) {
            this.y = SCREEN_HEIGHT - PARTICLE_SIZE;
            this.v.y *= -1;
        } else if (this.y < 0) {
            this.y = 0;
            this.v.y *= -1;
        }


    },
});