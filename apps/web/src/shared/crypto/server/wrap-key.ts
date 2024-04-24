export const wrapKey = async (
  key: CryptoKey,
  wrappingKey: CryptoKey
): Promise<{
  value: string;
  iv: string;
}> => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const wrappedKey = await crypto.subtle.wrapKey(
    "jwk", //can be "jwk", "raw", "spki", or "pkcs8"
    key, //the key you want to wrap, must be able to export to above format
    wrappingKey, //the AES-GCM key with "wrapKey" usage flag
    {
      //these are the wrapping key's algorithm options
      name: "AES-GCM",

      //Don't re-use initialization vectors!
      //Always generate a new iv every time your encrypt!
      //Recommended to use 12 bytes length
      iv,

      //Additional authentication data (optional)
      // additionalData: ArrayBuffer,

      //Tag length (optional)
      // tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
    }
  );
  const wrapped = Buffer.from(wrappedKey).toString("base64url");
  return { value: wrapped, iv: Buffer.from(iv).toString("base64url") };
};
