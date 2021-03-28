import { SetStorage } from "@/data/protocols/cache/SetStorage";
import { SaveAccessToken } from "@/domain/usecases/SaveAccessToken";

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken);
  }
}
