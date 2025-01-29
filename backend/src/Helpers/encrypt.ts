import bcrypt from 'bcrypt'

export const encrypt = (data: string): string => {
  return bcrypt.hashSync(data, 10)
}

export const checkEncrypt = async (data: string, encrypted: string): Promise<boolean> => {
  return await bcrypt.compare(data, encrypted)
}
