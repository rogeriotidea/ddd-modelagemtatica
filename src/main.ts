import Address from './entity/adress';
import Customer from './entity/customer';
import Order from './entity/order';
import OrderItem from './entity/order_item';

let customer = new Customer("123", "joao");
const address = new Address("rua dois", 2, "12345-555", "Sao Paulo");
customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "123", 5);
const item2 = new OrderItem("2", "Item 2", 10, "123", 5);

const order = new Order("1", "123", [item1, item2]);
