export class Errors {
  static getError(data:{msg:string, path: string}){
    return {errors:[
      data
    ]}
  }
}
