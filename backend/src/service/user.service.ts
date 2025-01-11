import db from "../database";
import { User } from "../entity";
import HttpException from "../lib/HttpException";

export class UserService{
  static async disableSeller(seller_id: string):Promise<User> {
    let user = await db.users.findOne({where:{id:seller_id}})
    if(!user)
      throw new HttpException(400,"user not found")
    user.isActive = false
    return await db.users.save(user)
  }
  static async activateSeller(seller_id: string):Promise<User> {
    let user = await db.users.findOne({where:{id:seller_id,isActive:false}})
    if(!user)
      throw new HttpException(400,"user not found")
    user.isActive = true
    return await db.users.save(user)
    }
    static async getSellers():Promise<User[]> {
        return await db.users.find({where:{role:"customer"}})
    }
    static async getSeller(user_id:string):Promise<User|null> {
      return await db.users.findOne({where:{role:"customer",id:user_id}})
  }
    static async updateUser({ user, name, address, city, postcode, country }:{ user:User,name:string, address:string, city:string, postcode:number, country:string }):Promise<User>{
        if (!name || !address || !city || !country) {
            throw new HttpException(400,"all fields are required")
        }

        const result = await db.users.update(
            { id: user.id },
            { name, address, city, country } // add postCode
          );

          if (result.affected === 0) {
            throw new HttpException(404, "User not found or no changes made");
          }

          let updatedUser = await db.users.findOneBy({id: user.id})
          if (!updatedUser) {
            throw new HttpException(400,"User not found")
          }

          return updatedUser;
    }
    
}