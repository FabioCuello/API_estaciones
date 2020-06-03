import { User } from "../models/user"

export const searchUsers = async (param: string): Promise<string[]> => {
    const list: string[] = []
    const subcriptionType = `subcriptions.${param}`

    const query = await User.find({ [subcriptionType]: true, verifiedAt: { $exists: true } })
    query.forEach(user => list.push(user.data.email))

    return list
}

