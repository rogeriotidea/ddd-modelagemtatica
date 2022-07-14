import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/adress";

const customer = CustomerFactory.createWithAddress(
    "John", 
    new Address("Street", 213, "Zip", "City"))

const input = {
    id: customer.id,
    name: "John updated",
    address: {
        street: "Street updated",
        number: 1234,
        zip: "Zip updated",
        city: "City updated"
    }
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn().mockReturnValue(Promise.resolve(input))
    };
};



