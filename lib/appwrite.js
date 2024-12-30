import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite'

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'id.andra.aora',
  projectId: '6644582300241ea9b991',
  databaseId: '66445a4f003ce865ea8c',
  userCollectionId: '66445b0800170d02f7d3',
  videoCollectionId: '66445b3200153ef13b53',
  storageId: '66445c42000386776aa1'
}
const client = new Client()
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)
const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (
  email,
  password,
  username,
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )
    if (!newAccount)
      throw Error
    const avatarUrl = avatars.getInitials(username)
    await signIn(email, password)
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.id,
        email,
        username,
        avatar: avatarUrl
      }
    )
    return newUser
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const signIn = async (
  email,
  password
) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
