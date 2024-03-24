import Aes from "react-native-aes-crypto";

export class Cryptography {
  private static salt: string = "barkin.balci@gmail.com";
  private static iterations: number = 256000;
  private static keySize: number = 256;
  private static encryptionKey: string;

  static async setEncryptionKey(password: string) {
    this.encryptionKey = await Aes.pbkdf2(password, this.salt, this.iterations, this.keySize, "sha512");
  }

  static getEncryptionKey(): string {
    return this.encryptionKey;
  }

  static async encrypt(data: string, iv: string): Promise<string> {
    return await Aes.encrypt(data, "86bcfcea9bec19eaf09513752b6b0b074762bab53b3341fb48ebad9d37c6e6d9", iv, "aes-256-cbc");
  }

  static async decrypt(data: string, iv: string): Promise<string> {
    return await Aes.decrypt(data, "86bcfcea9bec19eaf09513752b6b0b074762bab53b3341fb48ebad9d37c6e6d9", iv, "aes-256-cbc");
  }
}
