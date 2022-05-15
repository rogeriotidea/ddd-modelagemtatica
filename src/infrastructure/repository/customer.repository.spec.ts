import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/adress";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer Repository Test", () => {
    let sequelize: Sequelize;

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'memory',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;
 
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" }});
   
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        })

    });

    
    it("should update a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.address = address;
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" }});
      
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city
        })

    });


    it("should find a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "Zip Code 1", "City 1");
        customer.address = address;
        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);
      
        expect(customer).toStrictEqual(customerResult);

    });

    it("should throw an aerror when customer is not found", async() => {
        const customerRepository = new CustomerRepository();

        expect(async() => {
            await customerRepository.find("4565434")
        }).rejects.toThrow("Customer not found");
    });


    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        const address1 = new Address("Street 1", 1, "Zip code 1", "City 1");
        customer1.address = address1;
        customer1.addRewardPoints(10);
        customer1.activate();
    
        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 1", 1, "Zip code 1", "City 1");
        customer2.address = address2;
        customer2.addRewardPoints(10);
        customer2.activate();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();
   
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);     
        expect(customers).toContainEqual(customer2);     

    });
    

});