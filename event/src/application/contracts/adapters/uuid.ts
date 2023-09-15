export interface UUIDGenerator {
  uuid: () => UUIDGenerator.Output
}
export namespace UUIDGenerator {
  export type Output = string
}
