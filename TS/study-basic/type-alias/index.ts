/**
 * 联合类型和类型别名
 */

let num: 1 | 2 = 1;
type EventNames = 'click' | 'scroll' | 'mousemove';

// 类型别名
type Message = string | string[];

// 可辨识联合: 可辨识、联合类型和类型守卫

enum CarTransmission {
  Automatic = 200,
  Manual = 300
}

interface Motorcycle {
  vType: "motorcycle"; // 可辨识的属性
  make: number; // year
}

interface Car {
  vType: "car"; // discriminant
  transmission: CarTransmission
}

interface Truck {
  vType: "truck"; // discriminant
  capacity: number; // in tons
}

type Vehicle = Motorcycle | Car | Truck; // 联合类型

const EVALUATION_FACTOR = Math.PI;
function evaluatePrice(vehicle: Vehicle) {
  // 使用switch 判断，进行类型守卫
  switch(vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "truck":
      return vehicle.capacity * EVALUATION_FACTOR;
    case "motorcycle":
      return vehicle.make * EVALUATION_FACTOR;
  }
}
