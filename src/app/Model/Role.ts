export class Role{

	private id:number;
	private name:string;
	private carte:string;
	private probability:number;

	getId():number{
		return this.id;
	}
	setId(id:number):void{
		this.id=id;
	}
	getName():string{
		return this.name;
	}
	setName(name:string):void{
		this.name=name;
	}

	getCarte():string{
		return this.carte;
	}
	setCarte(carte:string):void{
		this.carte=carte;
	}

	getProbability():number{
		return this.probability;
	}
	setProbability(probability:number):void{
		this.probability = probability;		
	}
    static fromJson(json: Object): Role {
    	let role = new Role();
    	role.setId(json['id']);
    	role.setName(json['name']);
    	role.setCarte(json['carte']);
    	role.setProbability(json['probability']);
        return role;
    }
}