import {BaseEntity, ObjectLiteral} from 'typeorm'
import {AppDataSource} from './DataSource'

export const create = async (EntityPassed: typeof BaseEntity, data: ObjectLiteral): Promise<ObjectLiteral| Error | string> => {
  try{
    const entityRepository = AppDataSource.getRepository(EntityPassed)
    const newEntity = new EntityPassed()
    Object.keys(data).forEach((key) => {
      newEntity[(key as keyof BaseEntity)] = data[key]
    })
    return await entityRepository.save(newEntity)
  }catch(error){
    return (error as Error)
  }
}

export const update = async (EntityPassed: typeof BaseEntity, uuid: ObjectLiteral, data: ObjectLiteral) => {
  try{
    const entityRepository = AppDataSource.getRepository(EntityPassed)
    const foundedData = await entityRepository.findOneBy(uuid)
    if(foundedData !== null){
      Object.keys(data).forEach((key) => {
        foundedData[(key as keyof BaseEntity)] = data[key]
      })
      return await entityRepository.save(foundedData)
    }else{
      throw new Error('Register not found')
    }
  }catch(error){
    return (error as Error)
  }
}

export const findOneBy = async(EntityPassed: typeof BaseEntity, index: ObjectLiteral) => {
  try{
    const entityRepository = AppDataSource.getRepository(EntityPassed)
    const foundedData = await entityRepository.findOneBy(index)
    if(foundedData !== null){
      return foundedData
    }else{
      throw new Error('Register not found')
    }
  }catch(error){
    return (error as Error)
  }
}

export const find = async(EntityPassed: typeof BaseEntity, index: ObjectLiteral) => {
  try{
    const entityRepository = AppDataSource.getRepository(EntityPassed)
    const foundedData = await entityRepository.find({where:index, withDeleted:true})
    if(foundedData !== null){
      return foundedData
    }else{
      throw new Error('Register not found')
    }
  }catch(error){
    return (error as Error)
  }
}
