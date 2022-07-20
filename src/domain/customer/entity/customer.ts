import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/adress";

export default class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardsPoints: number = 0;

    constructor(id: string, name: string){
        super();
        this._id = id;
        this._name = name;
        this.validate();
        
        if (this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get name(): string {
        return this._name;
    }
  
    get rewardPoints(): number {
        return this._rewardsPoints;
    }

    get address(): Address {
        return this._address;
    }

    set address(address: Address){
        this._address = address;
    }
    
    validate() {
        if (this.id.length === 0){
            this.notification.addError({
                context: "customer",
                message: "Id is required"
            });
        }
        if (this._name.length === 0){
            this.notification.addError({
                context: "customer",
                message: "Name is required"
            });
        }        
    }

    changeName(name: string){
        this._name = name;
    }

    changeAddress(address: Address){
        this._address = address;
    }
    
    isActive(): boolean {
        return this._active;
    }

    activate(){
        if (this._address === undefined){
            throw new Error('Address is mandatory to activate a customer');
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number): void {
        this._rewardsPoints += points;
    }


}