const RANK_MLADSHI = 1;
const RANK_SREDEN = 2;
const RANK_STARSHI = 3;

function extend(constr1, constr2) {
    constr1.prototype = Object.create(constr2.prototype);
    constr1.prototype.constructor = constr1;
}

function Firma(name) {
    this.name = name;
    this.otdeli = [];
    this.dokumenti = [];
}

Firma.prototype.dobaviDoc = function (doc) {
    if (doc instanceof Dokument || doc instanceof SecretDokument) {
        this.dokumenti.push(doc);
    }
}

Firma.prototype.dobaviOtdel = function (department) {
    if (this.otdeli.length < 5) {
        this.otdeli.push(department);
    }
}

Firma.prototype.naznachi = function (slujitel, otdel) {
    if (slujitel.rank == RANK_STARSHI || slujitel.rakn == RANK_SREDEN) {
        slujitel.otdel = otdel;
    }

    if (!this.otdeli.some(x => x.otdel == otdel.name)) {
        if (otdel.slujiteli.length == 0 && otdel.shefche == false) {
            if (slujitel.rank != RANK_STARSHI) {
                throw new Error('Purviqt slujitel trqbva da e starshi v tozi otdel!')
            }
            else {

                this.otdeli.push(otdel);
                otdel.slujiteli.push(slujitel);
                slujitel.otdel = otdel;
                otdel.shefche = true;

            }
        }
    }

    else {
        otdel.slujiteli.push(slujitel);

    }

}

Firma.prototype.obrabotiDokument = function (doc) {
    var randomOtdel = this.otdeli[Math.floor(Math.random() * this.otdeli.length + 1)];
    var randomRabotnik = randomOtdel.slujiteli[Math.floor(Math.random() * randomOtdel.slujiteli.length + 1)];
    randomRabotnik.processDoc.call(this, doc);
}

Firma.prototype.showAllProcessedDocs = function () {
    this.otdeli.forEach(function (a) {
        var sortirani = a.slujiteli.sort(x => x.obraboteniDocs.length);
        sortirani.slujiteli.forEach(x => console.log(x.obraboteniDocs));
    });
}

Firma.prototype.showSumSalaries = function () {
    var zaplati = 0;
    for (index = 0; index < this.otdeli.length; index++) {

        zaplati += (this.otdeli[index].slujiteli.reduce((a, b) => a.zaplata + b.zaplata)) / this.otdeli[index].slujiteli.length;
    }

    console.log('Ei tolkoz se davat za zaplati ' + zaplati);

}

Firma.prototype.showLeastMistakenDocs = function () {
    var self = this;
    var slujitelNaiMalkoGreshki = gosho;
    for (index = 0; index < self.otdeli.length; index++) {
        var naiMalkoOburkani = self.otdeli[index].slujiteli.sort((a, b) => a.oburkaniDocs < b.oburkaniDocs);
        if (slujitelNaiMalkoGreshki.oburkaniDocs > naiMalkoOburkani[0].oburkaniDocs) {
            slujitelNaiMalkoGreshki = naiMalkoOburkani[0];
        }
    }
};

Firma.prototype.depWithLeastMistakes = function () {
    var self = this;
    var otdelSNaiMalkoGreshki = this.otdeli[0];
    var greshki = 50;
    for (index = 0; index < self.otdeli.length; index++) {
        if ((self.otdeli[index].slujiteli.reduce((a, b) => a.oburkaniDocs + b.oburkaniDocs)) < greshki) {
            otdelSNaiMalkoGreshki = self.otdeli[index];
        }
    }
};



function Otdel(name) {
    this.name = name;
    this.slujiteli = [];
    this.shefche = false;
}

function Dokument(title, slojnost) {
    this.title = title;
    if (!isNaN(Number(slojnost)) && slojnost >= 1 && slojnost <= 20);
    this.slojnost = slojnost;
}

function SecretDokument(title, slojnost, password) {
    Document.call(this, title, slojnost);
    if (password.trim().length > 5 && typeof password == 'string')
        this.password = password;
}

extend(SecretDokument, Dokument);

function Slujitel(name, rank, zaplata, otdel) {
    this.name = name;
    this.rank = rank;
    this.zaplata = zaplata;
    this.otdel = otdel;
    this.oburkaniDocs = [];
    this.obraboteniDocs = [];
    this.verniDocs = [];

}

Slujitel.prototype.processDoc = function (doc) {
    this.obraboteniDocs.push(doc);
    if (doc instanceof Dokument) {
        var shansZaGreshka = (100 - (doc.slojnost * this.rank));
        var shansZaGreshka = shansZaGreshka / 100;
        if (Math.random() < shansZaGreshka) {
            console.log(this.name + ' sgreshi dokumenta ' + doc.title);
            this.oburkaniDocs.push(doc);
        }
        else {
            console.log(this.name + ' obraboti uspeshno dokumenta ' + doc.title);
            this.verniDocs.push(doc);
        }
    }
    if (doc instanceof SecretDokument) {
        if (this.rank == RANK_STARSHI) {
            var shansZaGreshka = (100 - (doc.slojnost * this.rank));
            var shansZaGreshka = shansZaGreshka / 100;
            if (Math.random() < (shansZaGreshka + 0.2)) {
                console.log(this.name + 'sgreshi dokumenta ' + doc.title + '!');
                this.oburkaniDocs.push(doc);
            }

            else {
                console.log(this.name + 'obraboti uspeshno dokumenta! ' + doc.title);
                this.verniDocs.push(doc);
            }
        }
    }
}

Slujitel.prototype.reportDocs = function () {
    console.log('Slujitel: ' + this.name + '\n' + 'Obraboteni dokumenti: ' + this.obraboteniDocs.length);
    console.log('Pravilno obraboteni dokumenti: ' + this.verniDocs.length);
    console.log('Sgresheni dokumenti: ' + this.oburkaniDocs.length);
}

Slujitel.prototype.reportErrorDocs = function () {
    var sburkaniDocs = this.oburkaniDocs.sort(x => x.title);
    sburkaniDocs.forEach(x => console.log(x.title));
}

function MladshiSlujitel(name, rank, zaplata) {
    Slujitel.call(this, name, RANK_MLADSHI, zaplata);
}

extend(MladshiSlujitel, Slujitel);

function NormalenSlujitel(name, RANK_SREDEN, zaplata) {
    Slujitel.call(this, name, RANK_SREDEN, zaplata);

}

extend(NormalenSlujitel, Slujitel);

NormalenSlujitel.prototype.prehvurliRabotata = function (doc) {
    var sluga = this.otdel.slujiteli.find(x => x.rank < this.rank);
    console.log(this.name + ' prehvurli dokumenta ' + doc.title + ' na toq baluk ' + sluga.name);
    if (this.rank == RANK_STARSHI) {
        var indexSluga = this.otdel.slujiteli.findIndex(x => x.name == sluga.name);
        this.otdel.slujiteli[indexSluga].zaplata = this.otdel.slujiteli[indexSluga].zaplata * 1.05;

    }
}


function StarshiSlujitel(name, rank, zaplata) {
    Slujitel.call(this, name, RANK_STARSHI, zaplata);
    this.kolegi = [];
}

extend(StarshiSlujitel, NormalenSlujitel);

StarshiSlujitel.prototype.uvolniNaiSmotaniq = function () {
    this.kolegi = this.kolegi.sort((a, b) => a.oburkaniDocs.length < b.oburkaniDocs.length);
    this.kolegi.splice(0, 1);
}

// DEMO:
var krenvirshiBoni = new Firma('Boni');
var turgoviq = new Otdel('Turgoviq');
var komunikacii = new Otdel('Komunikacii');
var produkciq = new Otdel('Produkciq');
var finansi = new Otdel('Finansi');
var reklama = new Otdel('Reklama');
var dobri = new StarshiSlujitel('Dobri', RANK_MLADSHI, 2000);
var stamat = new MladshiSlujitel('Stambata', RANK_MLADSHI, 200);
krenvirshiBoni.dobaviOtdel(turgoviq);
krenvirshiBoni.dobaviOtdel(komunikacii);
krenvirshiBoni.dobaviOtdel(produkciq);
krenvirshiBoni.dobaviOtdel(finansi);
krenvirshiBoni.dobaviOtdel(reklama);
console.log(krenvirshiBoni.otdeli);

for (index = 1; index <= 20; index++) {
    var randomDept = Math.floor(Math.random() * krenvirshiBoni.otdeli.length);
    krenvirshiBoni.naznachi((new StarshiSlujitel('Dobri ' + index, RANK_STARSHI, 2000)), krenvirshiBoni.otdeli[randomDept]);
}

// console.log(krenvirshiBoni.otdeli);

for (index = 1; index <= 50; index++) {
    var randomSlojnost = Math.floor(Math.random() * 20 + 1);
    krenvirshiBoni.dokumenti.push(new Dokument('Bibliq ' + index, randomSlojnost));
}

console.log(krenvirshiBoni.dokumenti);

krenvirshiBoni.obrabotiDokument(krenvirshiBoni.dokumenti[2]);



// console.log(dobri);
// boni.dobaviOtdel(turgoviq);
// boni.dobaviOtdel(komunikacii);

// boni.naznachi(dobri,komunikacii);
// boni.naznachi(stamat,komunikacii);
// console.log(komunikacii);
// var stariqZavet = new Dokument('Bibliq',20);
// var noviqZavet = new Dokument('Bibiliq 2.0',20);
// dobri.process(stariqZavet);
// dobri.reportDocs();
// dobri.reportErrorDocs();
// stamat.processDoc(stariqZavet);
// stamat.processDoc(noviqZavet);
// dobri.prehvurliRabotata(stariqZavet);
// console.log(komunikacii.slujiteli);
// console.log(dobri.kolegi);
// console.log(stamat.zaplata);
// console.log(dobri.otdel);
// // boni.obrabotiDokument(stariqZavet);
// boni.showSumSalaries();

//     var indexOfOtdel = this.otdeli.findIndex(x => x == otdel);
//     this.otdeli[indexOfOtdel].slujiteli.push(slujitel);