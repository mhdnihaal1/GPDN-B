import { Request, Response, NextFunction } from "express";
import MembersAndPalliativeUseCase from "../../UsecaseLayer/MembersAndPalliativeUseCase/MembersAndPalliativeUsecase";

class MembersAndPalliativeController {
  private MembersAndPalliativeUseCase: MembersAndPalliativeUseCase;

  constructor(MembersAndPalliativeUseCase: MembersAndPalliativeUseCase) {
    this.MembersAndPalliativeUseCase = MembersAndPalliativeUseCase;
  }

  async fetchDoctors(req: Request, res: Response, next: NextFunction){
    try{

      const fetchedDoctors = await  this.MembersAndPalliativeUseCase.FetchDoctorsForm()
      return res.json({
        success: fetchedDoctors?.success,
        status: fetchedDoctors?.status,
        data: fetchedDoctors?.data,
      });       
    }catch(error){
      console.log(error)
    }
  }

  async searchDoctors(req: Request, res: Response, next: NextFunction){
    try{

      const { searchInp } = req.body;

      const searchDoctors = await this.MembersAndPalliativeUseCase.SearchDoctorsForm(searchInp);
      return res.json({
        success: searchDoctors?.success,
        status: searchDoctors?.status,
        data: searchDoctors?.data,
      });       
    }catch(error){
      console.log(error)
    }
  }

  async filterDoctors(req: Request, res: Response, next: NextFunction){
    try{
      const { filter } = req.body;
      const filterDoctor = await this.MembersAndPalliativeUseCase.filterDoctorsForm(filter);
      return res.json({
        success: filterDoctor?.success,
        status: filterDoctor?.status,
        data: filterDoctor?.data,
      });       
    }catch(error){
      console.log(error)
    }
  }

  async fetchPalliativeUnit(req: Request, res: Response, next: NextFunction){
    try{

      const fetchPalliativeUnit = await this.MembersAndPalliativeUseCase.fetchPalliativeUnitForm();
      return res.json({
        success: fetchPalliativeUnit?.success,
        status: fetchPalliativeUnit?.status,
        data: fetchPalliativeUnit?.data,
      });       
    }catch(error){
      console.log(error)
    }
  }

  async addPalliativeUnit(req: Request, res: Response, next: NextFunction){
    try{

      const { name , location , services , contactDetails} = req.body

      const addPalliativeUnit = await this.MembersAndPalliativeUseCase.addPalliativeUnitForm(name , location , services , contactDetails)
      return res.json({
        success: addPalliativeUnit?.success,
        status: addPalliativeUnit?.status,
        data: addPalliativeUnit?.data,
      }); 
    }catch(error){
      console.log(error)
    }
  }

  async editPalliativeUnit(req: Request, res: Response, next: NextFunction){
    try{

      const { name , location , services , contactDetails} = req.body

      const editPalliativeUnit = await this.MembersAndPalliativeUseCase.editPalliativeUnitForm(name , location , services , contactDetails)
      return res.json({
        success: editPalliativeUnit?.success,
        status: editPalliativeUnit?.status,
        data: editPalliativeUnit?.data,
      });       
    }catch(error){
      console.log(error)
    }
  }

  async deletePalliativeUnit(req: Request, res: Response, next: NextFunction){
    try{

      const { UnitId } = req.body;

      const deletePalliativeUnit = await this.MembersAndPalliativeUseCase.deletePalliativeUnitForm(UnitId)
      return res.json({
        success: deletePalliativeUnit?.success,
        status: deletePalliativeUnit?.status,
        data: deletePalliativeUnit?.data,
      }); 
      }catch(error){
      console.log(error)
    }
  }

  async searchPalliativeUnit(req: Request, res: Response, next: NextFunction){
    try{

      const { searchInp } = req.body;

      const searchPalliativeUnit = await this.MembersAndPalliativeUseCase.searchPalliativeUnitForm(searchInp)
      return res.json({
        success: searchPalliativeUnit?.success,
        status: searchPalliativeUnit?.status,
        data: searchPalliativeUnit?.data,
      });       
    }catch(error){
      console.log(error)
    }
  }



}


export default MembersAndPalliativeController;