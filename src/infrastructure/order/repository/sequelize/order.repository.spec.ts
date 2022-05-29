import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/adress";
import Customer from "../../../../domain/customer/entity/customer";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Product from "../../../../domain/product/entity/product";

import OrderRepository from "./order.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import OrderModel from "./order.model";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";

describe("Order Repository Test", () => {
    let sequelize: Sequelize;

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            //storage: 'memory',
            logging: false,
            //sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async() => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "Customer 1");
        const address = new Address('Street 1', 1, 'Zip code 1', 'City 1');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);

        const order = new Order('123', '1', [orderItem]);

        const orderRepository = new OrderRepository()
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id
            },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: '123',
            customer_id: '1',
            total: order.total(),
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                product_id: orderItem.productId,
                order_id: '123'
            }]
        })
    });

});