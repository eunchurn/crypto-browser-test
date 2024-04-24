export const encrypt = async (
  key: CryptoKey,
  payload: string
): Promise<{
  value: string;
  iv: string;
}> => {
  // const encoder = new TextEncoder();
  // const data = encoder.encode(payload);
  const data = Uint8Array.from(payload, (c) => c.charCodeAt(0));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",

      //Don't re-use initialization vectors!
      //Always generate a new iv every time your encrypt!
      //Recommended to use 12 bytes length
      iv,

      //Additional authentication data (optional)
      // additionalData: ArrayBuffer,

      //Tag length (optional)
      tagLength: 128, //can be 32, 64, 96, 104, 112, 120 or 128 (default)
    },
    key, //from generateKey or importKey above
    data //ArrayBuffer of data you want to encrypt
  );
  // const decoder = new TextDecoder("utf-8");
  const value = Buffer.from(encrypted).toString("base64");
  return { value, iv: Buffer.from(iv).toString("base64") };
};
