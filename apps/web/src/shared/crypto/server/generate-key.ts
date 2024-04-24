import crypto from "node:crypto";

export const generateKey = async (
  keyUsage: KeyUsage[]
): Promise<crypto.webcrypto.CryptoKey> => {
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    keyUsage
    // ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
  );
  return key;
};

export const exportKey = async (key: CryptoKey) => {
  const exportedKey = await crypto.subtle.exportKey(
    "jwk", //can be "jwk" or "raw"
    key //extractable must be true
  );
  return exportedKey;
};

export const importKey = async (jwk: JsonWebKey) => {
  const importedKey = await crypto.subtle.importKey(
    "jwk", //can be "jwk" or "raw"
    jwk,
    {
      //this is the algorithm options
      name: "AES-GCM",
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
  );
  return importedKey;
};
