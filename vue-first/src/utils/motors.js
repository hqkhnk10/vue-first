let idMotor = 0;
let motors = [
    {
        id: idMotor++,
        type: 'Motor',
        brand: 'Yamaha',
        model: 'PKL Yamaha R15 V3',
        speed: '80',
        weight: '800',
        introduction: 'June 2021',
        number: 14,
        price: 4000,
        src: require('../assets/toyota.jpg')
    },
    {
        id: idMotor++,
        type: 'Motor',
        brand: 'Honda',
        model: 'Honda CBR150R 2021',
        speed: '120',
        weight: '1000',
        introduction: 'July 2017',
        number: 12,
        price: 4500,
        src: 'https://daotaolaixe.com.vn/wp-content/uploads/2021/06/Xe-PKL-gia-re-Honda-CBR150R-2021-.jpg',
    },
    {
        id: idMotor++,
        type: 'Motor',
        brand: 'Suzuki',
        model: 'Suzuki GSX R150 2021',
        speed: '150',
        weight: '1500',
        introduction: 'November 2019',
        number: 10,
        price: 5000,
        src: 'https://daotaolaixe.com.vn/wp-content/uploads/2021/06/Xe-moto-PKL-Suzuki-GSX-R150-2021.jpg',
    },
];


var motorList = [];
var i, j;
var motorBrand = true;
var d = new Date("2015-03-25");
var x = 0;
var whoAsk = 'TruongNgo';
for (i = 0; i < motors.length; i++) {
    motors[i].price = format2(motors[i].price, '$ ');
}
for (i = 0; i < motors.length; i++) {
    for (j = 0; j < motorList.length; j++) {
        if (motorList[j].brand == motors[i].brand) {
            motorList[j].left += motors[i].number;
            motorBrand = false;
        }
        else {
            motorBrand = true;
        }
    }
    if (motorBrand == true) {
        motorList.push({
            id: x,
            brand: motors[i].brand, left: motors[i].number,
            type: 'motor', date: d,
            who: whoAsk,
        });
        x++;
    }
}

function format2(n, currency) {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

var motormotor = JSON.stringify(motors);
localStorage.setItem("motors", motormotor);

export { motors, motorList }