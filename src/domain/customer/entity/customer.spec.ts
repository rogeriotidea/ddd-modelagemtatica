import Address from "../value-object/adress";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should get throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "teste");
        }).toThrowError("customer: Id is required");
    });

    it("should get throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("customer: Name is required");
    });

    it("should change name", () => {

        const customer = new Customer("1", "Teste");
        customer.changeName("Teste2");
        expect(customer.name).toBe("Teste2");

    });

    it("should activate customer", () => {

        const customer = new Customer("1", "Customer");
        const address = new Address("Street1", 123, "13330-000", "Teste");
        customer.address = address;
        customer.activate();
       
        expect(customer.isActive()).toBe(true);

    });

    it("should deactivate customer", () => {

        const customer = new Customer("1", "Customer");        
        customer.deactivate();
       
        expect(customer.isActive()).toBe(false);

    });

    it("should should throw error when address is undefined", () => {
       
        expect(() => {
            const customer = new Customer("1", "Customer");             
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");

    });

    it("should add reward points", () => {
       
       const customer = new Customer("1", "Customer 1");
       expect(customer.rewardPoints).toBe(0);

       customer.addRewardPoints(10);
       expect(customer.rewardPoints).toBe(10);

       customer.addRewardPoints(10);
       expect(customer.rewardPoints).toBe(20);

    });
});