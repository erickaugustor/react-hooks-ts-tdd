import { SetStorage } from "@/data/protocols/cache/SetStorage"

export class SetStorageMock implements SetStorage {
  key: string
  value: any

  async set (key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
  }
}