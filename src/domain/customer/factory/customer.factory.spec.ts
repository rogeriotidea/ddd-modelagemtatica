import Address from "../value-object/adress";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {
    it("should create a customer",() => {
        let customer = CustomerFactory.create("John");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Street", 1, "11330-000", "Sao Paulo");
        let customer = CustomerFactory.createWithAddress("John", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    })
});