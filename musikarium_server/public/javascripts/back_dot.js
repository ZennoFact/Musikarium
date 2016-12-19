phina.globalize();

phina.define('BackDot', {
    superClass: 'Shape',
    init: function (options) {
        this.superInit(options);
        this.dot = CircleShape({
            radius: 3,
            fill: '#343434',
            stroke: null,
        }).addChildTo(this)
            .setPosition(Math.randint(0, this.width), Math.randint(0, this.height) );

        this.dot.v = Vector2((Math.random() - 0.5) / 2 , (Math.random() - 0.5) / 2);
        this.dot.hitArea = CircleShape({ radius: 100 });
        this.dot.hitArea.x = this.dot.x - this.dot.hitArea.radius / 2;
        this.dot.hitArea.y = this.dot.y - this.dot.hitArea.radius / 2;
        this.partneres = [];

        this.blendMode = 'lighter';
    },
    update: function(app) {
        this.dot.position.add(this.dot.v);
        if (this.dot.x < 0) this.dot.x = SCREEN_WIDTH;
        else if (this.dot.x > SCREEN_WIDTH) this.dot.x = 0;
        else if (this.dot.y < 0) this.dot.y = SCREEN_HEIGHT;
        else if (this.dot.y > SCREEN_HEIGHT) this.dot.y = 0;

        this.dot.hitArea.setPosition(this.dot.x, this.dot.y);

        var self = this;

        this.partneres = this.targets.filter(function (target) {
            return ( self.dot.hitArea.hitTestElement(target.dot) );
        });
    },
    render: function (canvas) {
        canvas.clear();
        var self = this;
        this.partneres.forEach(function (dot) {
            var dot = dot.dot;
            // TODO 透明度ではなく，色自体を変化させたらいいんじゃないか
            var d = Math.sqrt( Math.pow((dot.x - self.x), 2) + Math.pow((dot.y - self.y), 2) );
            canvas.strokeStyle = 'rgba(32, 32, 32, ' + (d / 160 ) + ')';
            // canvas.strokeStyle = '#282828';

            canvas.lineWidth = 1;
            canvas.drawLine(dot.x, dot.y, self.dot.x, self.dot.y);
        });
        this.partneres = [];
    },
});

// var bgc = app._scenes[1].children[0].children;
//
// bgc.each(function(bp) {
//     for (var i = bp.index + 1; i < bgc.length; i++) {
//         if (bp.hitArea.hitTestElement(bgc[i])) {
//             app._scenes[1].canvas.strokeStyle = '#ffffff';
//             app._scenes[1].canvas.lineWidth = 3;
//             app._scenes[1].canvas.drawLine(this.x, this.y, 0, 0);
//         }
//     }
//
// }, this);