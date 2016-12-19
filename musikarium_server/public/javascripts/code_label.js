phina.globalize();

phina.define('Code', {
    superClass: 'Label',
    init: function(str) {
        this.superInit({
            text: str,
        });
        this.fill = '#323232'; // 塗りつぶし色
        this.roll = 0;
    },
    update: function(app) {
        var p = Vector2(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

        this.x += BLOW_RATE - Math.random();
        this.y += BLOW_RATE - Math.random();

        if (this.roll > 0) {
            this.rotation += this.roll;
            this.scaleX += 0.4;
            this.scaleY += 0.4;

            if (this.rotation === 360) {
                this.rotation = 0;
                this.roll = 0;
            }
        }
    },
});