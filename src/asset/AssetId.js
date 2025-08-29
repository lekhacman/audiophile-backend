export default class AssetId {
  constructor(ownerId, fileId) {
    this.ownerId = ownerId;
    this.fileId = fileId;
  }

  toString() {
    return `${this.ownerId}:${this.fileId}`;
  }

  static of({ ownerId, fileId }) {
    return new AssetId(ownerId, fileId);
  }

  static from(string) {
    return new AssetId(...string.split(":"));
  }
}
