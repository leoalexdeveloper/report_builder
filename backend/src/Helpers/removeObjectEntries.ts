export const removeObjectEntries = (data:object, selectedKeys:string[]) => {
  Object.keys(data).forEach(key => {
    if(selectedKeys.includes(key)) delete data[(key as keyof object)]
  })
  return data
}
