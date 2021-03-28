import { LocalSaveAccessToken } from "@/data/usecases/SaveAccessToken/LocalSaveAccressToken"
import { SaveAccessToken } from "@/domain/usecases/SaveAccessToken"
import { makeLocalStorageAdapter } from "../../cache/LocalStorageAdapterFactory"

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
