var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pomiary = /** @class */ (function () {
    function Pomiary() {
        this.lista = [];
    }
    Pomiary.prototype.dodaj = function (data_, pomiar_) {
        var roznica = 0;
        if (this.lista.length > 0)
            roznica = pomiar_ - this.lista[this.lista.length - 1].pomiar;
        this.lista.push({ data: data_, pomiar: pomiar_, roznica: roznica });
    };
    Pomiary.prototype.ostPomiar = function () {
        return this.lista[this.lista.length - 1];
    };
    Pomiary.prototype.roznica = function (dataStart, dataKoniec) {
        var pomStart = this.lista.filter(function (e) { return e.data.getTime() == dataStart.getTime(); });
        var pomKoniec = this.lista.filter(function (e) { return e.data.getTime() == dataKoniec.getTime(); });
        if (dataKoniec.getTime() < dataStart.getTime() || pomStart.length == 0 || pomKoniec.length == 0)
            return -1;
        return pomKoniec[0].pomiar - pomStart[0].pomiar;
    };
    Pomiary.prototype.srednieWOkresie = function (dataStart, dataKoniec) {
        var dane = this.lista.filter(function (e) { return e.data.getTime() >= dataStart.getTime() && e.data.getTime() <= dataKoniec.getTime(); });
        if (dane.length == 0)
            return -1;
        var stan0 = dane[0].pomiar;
        var suma = 0;
        dane.forEach(function (e) {
            suma += e.pomiar - stan0;
            stan0 = e.pomiar;
        });
        return suma / (dane.length - 1);
    };
    return Pomiary;
}());
var PomiaryNew = /** @class */ (function (_super) {
    __extends(PomiaryNew, _super);
    function PomiaryNew() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PomiaryNew.prototype.daneZak = function (dataStart, dataKoniec) {
        return this.lista.filter(function (e) { return e.data.getTime() >= dataStart.getTime() && e.data.getTime() <= dataKoniec.getTime(); });
    };
    PomiaryNew.prototype.max = function (dataStart, dataKoniec) {
        var dane = this.lista.filter(function (e) { return e.data.getTime() >= dataStart.getTime() && e.data.getTime() <= dataKoniec.getTime(); });
        var tmp = { roznica: 0 };
        dane.forEach(function (e) {
            if (e.roznica > tmp.roznica)
                tmp = e;
        });
        return tmp;
    };
    PomiaryNew.prototype.min = function (dataStart, dataKoniec) {
        var dane = this.lista.filter(function (e) { return e.data.getTime() >= dataStart.getTime() && e.data.getTime() <= dataKoniec.getTime(); });
        var tmp = this.max(dataStart, dataKoniec);
        dane.forEach(function (e) {
            if (e.roznica < tmp.roznica)
                tmp = e;
        });
        return tmp;
    };
    PomiaryNew.prototype.avg = function (dataStart, dataKoniec) {
        var dane = this.daneZak(dataStart, dataKoniec);
        return dane.reduce(function (a, e) { return a + e.roznica; }, 0) / dane.length;
    };
    PomiaryNew.prototype.statMonth = function (dataStart, dataKoniec) {
        var dane = this.daneZak(dataStart, dataKoniec);
        dane.forEach(function (e) {
            console.log(e.data);
        });
    };
    return PomiaryNew;
}(Pomiary));
var pom = new PomiaryNew();
var start = new Date('2022-01-01T00:00:00.000Z');
console.log(start);
var pomiar = 10;
for (var i = 1; i < 7; i++) { //start.getHours()+1  //start.setHours(start.getHours()+1)
    pom.dodaj(start, pomiar += Math.floor((Math.random() * 4)));
    start.setDate(start.getDate() + 1);
    console.log(start);
}
var dataStart = new Date('2022-01-01T00:00:00.000Z');
var dataStop = new Date('2023-01-07T00:00:00.000Z');
console.log("max:", pom.max(dataStart, dataStop));
console.log("min:", pom.min(dataStart, dataStop));
console.log("avg:", pom.avg(dataStart, dataStop));
