import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite"

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
}
const client = new Client()
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)
const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )
    if (!newAccount) throw Error
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
        avatar: avatarUrl,
      }
    )
    return newUser
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
