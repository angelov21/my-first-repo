function Shop(name) {
    this.name = name;
    var produkti = [];

    this.addProduct = function (product) {
        if (product instanceof Product) {
            produkti.push(product);
        }
    }

    this.removeProduct = function (id) {
        if (id >= 1) {
            produkti.splice(produkti.findIndex(x => x.id == id), 1)
        }
    }

    this.showProducts = function () {
        document.write('<h1> Наденички, баткоо </h1>');
        document.write('<table> <tr> <th scope="col"> Снимка </th> <th scope="col"> Име </th> <th scope="col"> Цена </th> </tr>');
        produkti.forEach(x => document.write(`<tr> <td> <img src=${x.photo} height=100px/> </td> <td> ${x.name} </td> <td> <b>${x.price}</b> </td> </tr>`));
        document.write('</table>');
    }

    this.sortProducts = function (sortOrder) {

        switch (sortOrder) {
            case 'price': produkti = produkti.sort((a, b) => a.price > b.price); break;
            case 'name': produkti = produkti.sort((a, b) => a.name > b.name); break;
            case 'id': produkti = produkti.sort((a, b) => a.id > b.id); break;
        }
        console.log(produkti);
    }

    this.filterProducts = function (filterCaption) {
        if (typeof filterCaption == 'string') {
            produkti = produkti.filter(x => x.name.indexOf(filterCaption) !== -1);
            console.log(produkti);
        }
    }

    this.showDetails = function (id) {
        var index = produkti.findIndex(x => x.id == id);
        document.write(`<img id='detail-image' src=${produkti[index].photo} alt='nadenica'/> <h1 id='detail-heading'> ${produkti[index].name} </h1> <hr/> <p> ${produkti[index].description}  <span> <b> Произход: </b> <i> ${produkti[index].city} </i> </span> </p>`)
    }
}


var idCounter = 1;

function Product(name, price, photo, description, city) {
    this.price = price;
    this.id = idCounter++;
    this.photo = photo;
    this.name = name;
    this.description = description;
    this.city = city;

}

var makedonska = new Product('Македонска', 15, 'http://malvis.bg/media/product/2ef7fbe382c902ab2866652b062c4d58.jpg',
    'Сочна и вкусна наденица, приготвена по класическа рецепта. Подправена с традиционни аромати', 'Македония');

var lionska = new Product('Лионска', 20, 'http://work.ilyan.com/LEKI-website/wp/wp-content/uploads/2013/04/Packs-LionskaBulk255x255.png',
    'Произвежда се от телешко и свинско месо, сланина, вода, червен пипер и твърдо сирене', 'Първомай');

var bratvurst = new Product('Братвурст', 30, 'http://www.gotvetesmen.com/images/recipes/4130_37271.jpg',
    'Традиционна баварска наденица, с бял цвят, произведена от много фино смляно телешко месо, сланина, магданоз, сол, джинджифил, лук, кардамон и лимон. Приготвят се като се потапят за около 15 минути във гореща (не вряща) вода и се поднасят на масата в купа, заедно с водата в която са приготвени, за да запазят максимално топли. При консумация обвивката от естествено черво се премахва (не се консумира)!',
    'Дойчланд');

var srubska = new Product('Сръбска', 9, 'http://www.regal.bg/shimg/dx568_2517058.jpg',
    'Произведена от свинско месо, сланина, сол и подправки. Предлага се в сурово състояние и е подходяща за печене на скара;',
    'Братята сръби');

var sudjuk = new Product('Суджук', 13.46, 'http://www.gradskoselo.bg/media/catalog/product/cache/1/image/b8f6c627541c3f317f8b85188dbd2ad5/s/u/sudjuk-px.jpg',
    'Суджукът е сурово-сушен месен продукт, традиционнен за българската национална кухня.Приготвя се от кълцано месо от едри преживни животни или смес със свинско полутлъсто месо, животинска мазнина, селитра, кимион, захар, сол, черен пипер.',
    'Петрохан');


var priPepi = new Shop('Pri Pepi');

priPepi.addProduct(makedonska);
priPepi.addProduct(lionska);
priPepi.addProduct(bratvurst);
priPepi.addProduct(srubska);
priPepi.addProduct(sudjuk);
priPepi.sortProducts('price');
priPepi.filterProducts('ка')
priPepi.showProducts();



