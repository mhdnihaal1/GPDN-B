import IUnit from "../../DomainLayer/UnitDomain";
import IUser from "../../DomainLayer/UserDomain";    


interface MembersAndPalliativeRepo {




    FetchDoctors():Promise<IUser | any>;
    SearchDoctor(searchInp:string):Promise<IUser | any>;
    filterDoctors(filter:string):Promise<IUser | any>;
    fetchPalliativeUnit():Promise<IUnit | any>;
    addPalliativeUnit(PalliativeUnit:IUnit):Promise<IUnit | any>;
    editPalliativeUnit(PalliativeUnit:IUnit):Promise<IUnit | any>;
    deletePalliativeUnit(UnitId:string):Promise<IUnit | any>;
    searchPalliativeUnit(searchInp:string):Promise<IUnit | any>;

  
}

export default MembersAndPalliativeRepo;