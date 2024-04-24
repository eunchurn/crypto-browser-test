export const decrypt = async (
  key: CryptoKey,
  ivValue: string,
  value: string
): Promise<string> => {
  const iv = Buffer.from(ivValue, "base64");
  const data = Buffer.from(value, "base64");
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv, //The initialization vector you used to encrypt
      // additionalData: ArrayBuffer, //The addtionalData you used to encrypt (if any)
      tagLength: 128, //The tagLength you used to encrypt (if any)
    },
    key, //from generateKey or importKey above
    data //ArrayBuffer of the data
  );
  const decoded = Buffer.from(decrypted).toString("utf8");
  return decoded;
};
