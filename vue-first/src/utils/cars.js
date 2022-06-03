
let id = 0;
let cars = [
    {
        id: id,
        type: 'Car',
        brand: 'Toyota',
        model: 'Toyota Avanza',
        speed: '150',
        weight: '1360',
        introduction: 'October 2010',
        number: 5,
        price: 30000,
        src: 'https://img1.oto.com.vn/2022/03/23/OpzfnMD2/ngoai-that-avanza-premio-13-eb0f.jpg',
    },
    {
        id: ++id,
        type: 'Car',
        brand: 'Toyota',
        model: 'Toyota Camry',
        speed: '231',
        weight: '1900',
        introduction: 'July 2012',
        number: 2,
        price: 50000,
        src: 'https://img.tinbanxe.vn/webp/images/Toyota/toyota-camry/mau-sac/toyota-camry-mau-do-tinbanxe.jpg',
    },
    {
        id: ++id,
        type: 'Car',
        brand: 'Toyota',
        model: 'Toyota Vios',
        speed: '189',
        weight: '1300',
        introduction: 'July 2020',
        number: 4,
        price: 20000,
        src: 'http://www.toyotalongan.com.vn/upload/images/gia-xe-vios-1-5g-cvt-2019(1).png',
    },
    {
        id: ++id,
        type: 'Car',
        brand: 'Hyundai',
        model: 'Hyundai Accent',
        speed: '120',
        weight: '1500',
        introduction: 'December 2015',
        number: 2,
        price: 20000,
        src: 'https://i1-vnexpress.vnecdn.net/2021/09/17/avatarjpg-1631841781.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=heh4VYqh5WyyNRce94Yn6g&t=image',
    },
    {
        id: ++id,
        type: 'Car',
        brand: 'Vinfast',
        model: 'Vinfast President',
        speed: '200',
        weight: '1260',
        introduction: 'January 2020',
        number: 3,
        price: 15000,
        src: 'https://vcdn-vnexpress.vnecdn.net/2020/08/04/VinFast-President-1-9915-1596526753.jpg',
    },
];
var carList = [];
var i, j;
var carBrand = true;
var d = new Date("2012-12-20");

/*for (i = 0; i < cars.length; i++) {
    cars[i].price = format2(cars[i].price, '$ ');
}
function format2(n, currency) {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}*/
var x = 0;
var whoAsk = 'TruongNgo';
for (i = 0; i < cars.length; i++) {
    for (j = 0; j < carList.length; j++) {
        if (carList[j].brand == cars[i].brand) {
            carList[j].left += cars[i].number;
            carBrand = false;
        }
        else {
            carBrand = true;
        }
    }
    if (carBrand == true) {
        carList.push({
            id: x, brand: cars[i].brand, left: cars[i].number, type: 'car', date: d, who: whoAsk
        });
        x++;
    }
}

export { cars, carList }

