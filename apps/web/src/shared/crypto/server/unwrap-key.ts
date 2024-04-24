export const unwrapKey = async (
  wrappingKey: CryptoKey,
  wrappedKeyBase64URL: string,
  ivBase64URL: string
): Promise<CryptoKey> => {
  const wrapped = Buffer.from(wrappedKeyBase64URL, "base64url");
  const iv = Buffer.from(ivBase64URL, "base64url");
  const unwrapped = await crypto.subtle.unwrapKey(
    "jwk", //"jwk", "raw", "spki", or "pkcs8" (whatever was used in wrapping)
    wrapped, //the key you want to unwrap
    wrappingKey, //the AES-GCM key with "unwrapKey" usage flag
    {
      //these are the wrapping key's algorithm options
      name: "AES-GCM",
      iv, //The initialization vector you used to encrypt
      // additionalData: ArrayBuffer, //The addtionalData you used to encrypt (if any)
      tagLength: 128, //The tagLength you used to encrypt (if any)
    },
    {
      //this what you want the wrapped key to become (same as when wrapping)
      name: "AES-CBC",
      length: 256,
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //the usages you want the unwrapped key to have
  );
  return unwrapped;
};
