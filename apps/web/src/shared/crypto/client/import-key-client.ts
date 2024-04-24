export const importKeyClient = async (jwk: JsonWebKey) => {
  const importedKey = await window.crypto.subtle.importKey(
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
