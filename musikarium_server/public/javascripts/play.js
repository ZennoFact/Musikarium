var MusicScale = function (code, hertz) {
    this.code = code;
    this.hertz = hertz;
};

MusicScale.prototype.getHertz = function () {
  return this.hertz;
};

var scales = {
    90: new MusicScale('C3' , 131),  // Z ド-
    88: new MusicScale('D3' , 148),  // X レ-
    67: new MusicScale('E3' , 165),  // C ミ-
    86: new MusicScale('F3' , 175),  // V ファ-
    78: new MusicScale('G3' , 196),  // N ソ-
    77: new MusicScale('A3' , 220),  // M ラ-
    188:new MusicScale('B3' , 247),  // , シ-
    190:new MusicScale('C4' , 261),  // . ド

    65: new MusicScale('C4' , 261),  // A ド
    83: new MusicScale('D4' , 294),  // S レ
    68: new MusicScale('E4' , 330),  // D ミ
    70: new MusicScale('F4' , 349),  // F ファ
    74: new MusicScale('G4' , 392),  // J ソ
    75: new MusicScale('A4' , 440),  // K ラ
    76: new MusicScale('B4' , 494),  // L シ
    59 :new MusicScale('C5' , 523),  // ; ド+

    81: new MusicScale('C5' , 523),  // Q ド+
    87: new MusicScale('D5' , 587),  // W レ+
    69: new MusicScale('E5' , 659),  // E ミ+
    82: new MusicScale('F5' , 698),  // R ファ+
    85: new MusicScale('G5' , 784),  // U ソ+
    73: new MusicScale('A5' , 880),  // I ラ+
    79: new MusicScale('B5' , 988),  // O シ+
    80: new MusicScale('C6' , 1047), // P ド++

    49: new MusicScale('C6' , 1047), // 1 ド++
    50: new MusicScale('D6' , 1175), // 2 レ++
    51: new MusicScale('E6' , 1319), // 3 ミ++
    52: new MusicScale('F6' , 1397), // 4 ファ++
    55: new MusicScale('G6' , 1568), // 7 ソ++
    56: new MusicScale('A6' , 1760), // 8 ラ++
    57: new MusicScale('B6' , 1975), // 9 シ++
    48: new MusicScale('C7' , 2093), // 0 ド+++
};

var scalesBlack = {
    90: new MusicScale('C3#' , 139),  // Z ド-#
    88: new MusicScale('D3#' , 156),  // X レ-#
    67: new MusicScale('E3F' , 156),  // C ミ-♭
    86: new MusicScale('F3#' , 185),  // V ファ-#
    78: new MusicScale('G3#' , 208),  // N ソ-#
    77: new MusicScale('A3#' , 233),  // M ラ-#
    188:new MusicScale('B3F' , 233),  // , シ-♭
    190:new MusicScale('C4#' , 277), 　// . ド#

    65: new MusicScale('C4#' , 277),  // A ド#
    83: new MusicScale('D4#' , 311),  // S レ#
    68: new MusicScale('E4F' , 311),  // D ミ♭
    70: new MusicScale('F4#' , 370),  // F ファ#
    74: new MusicScale('G4#' , 415),  // J ソ#
    75: new MusicScale('A4#' , 466),  // K ラ#
    76: new MusicScale('B4F' , 466),  // L シ♭
    59 :new MusicScale('C5#' , 554),  // ; ド+#

    81: new MusicScale('C5#' , 554),  // Q ド+#
    87: new MusicScale('D5#' , 622),  // W レ+#
    69: new MusicScale('E5F' , 622),  // E ミ+♭
    82: new MusicScale('F5#' , 740),  // R ファ+#
    85: new MusicScale('G5#' , 831),  // U ソ+#
    73: new MusicScale('A5#' , 932),  // I ラ+#
    79: new MusicScale('B5F' , 932),  // O シ+♭
    80: new MusicScale('C6#' , 1109), // P ド++#

    49: new MusicScale('C6#' , 1109), // 1 ド++#
    50: new MusicScale('D6#' , 1245), // 2 レ++#
    51: new MusicScale('E6#' , 1245), // 3 ミ++♭
    52: new MusicScale('F6F' , 1480), // 4 ファ++#
    55: new MusicScale('G6#' , 1661), // 7 ソ++#
    56: new MusicScale('A6#' , 1865), // 8 ラ++#
    57: new MusicScale('B6F' , 1865), // 9 シ++♭
    48: new MusicScale('C7#' , 2217), // 0 ド+++#
};

var harmony = {
    71: [65, 68, 74],
    72: [83, 70, 75],
    84: [81, 87, 69],
    89: [87, 73, 83],
    66: [90, 67, 78],
    191:[88, 86, 77],
    222:[74, 76, 87],
    219:[68, 74, 76],
    221:[75, 59, 69],
    53: [49, 51, 55],
    54: [50, 52, 56],
    173:[81, 85, 80],
    61: [74, 81, 85],
    220:[65, 74, 59],
    192:[90, 78, 190]
}

function triad(array) {
    var sin1 = T('sin', {freq:scales[array[0]].getHertz(), mul:0.3});
    var sin2 = T('sin', {freq:scales[array[1]].getHertz(), mul:0.3});
    var sin3 = T('sin', {freq:scales[array[2]].getHertz(), mul:0.3});

    T('perc', {r:1000}, sin1, sin2, sin3).on('ended', function() {
        this.pause();
    }).bang().play();
}

function singleScale(key, isBlack) {
    var sin;
    if (isBlack) sin = T('sin', { freq: scalesBlack[key].getHertz(), mul: 0.5 });
    else sin = T('sin', { freq: scales[key].getHertz(), mul: 0.5 });
    T('perc', {r:1000}, sin).on('ended', function() {
        this.pause();
    }).bang().play();
}

