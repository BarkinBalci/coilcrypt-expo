import Aes from "react-native-aes-crypto";

export class Cryptography {
  private static iterations: number = 256000;
  private static keySize: number = 256;
  private static encryptionKey: string;

  static async setEncryptionKey(password: string, salt: string): Promise<string> {
    this.encryptionKey = await Aes.pbkdf2(password, salt, this.iterations, this.keySize, "sha512")
    return (this.encryptionKey);
  }

  static getEncryptionKey(): string {
    return this.encryptionKey;
  }

  static async encrypt(data: string, iv: string): Promise<string> {
    return await Aes.encrypt(data, this.getEncryptionKey(), iv, "aes-256-cbc");
  }

  static async decrypt(data: string, iv: string): Promise<string> {
    return await Aes.decrypt(data, this.getEncryptionKey(), iv, "aes-256-cbc");
  }

  static hash(data: string): Promise<string> {
    return Aes.sha512(data);
  }
}
