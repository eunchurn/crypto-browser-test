interface DecryptType {
  key: CryptoKey;
  iv: string;
  value: string;
}

export async function decryptClient(params: DecryptType): Promise<string> {
  const { key, iv: ivValue, value } = params;
  const iv = base64ToArrayBuffer(ivValue);
  const data = base64ToArrayBuffer(value);
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
  const decoder = new TextDecoder();
  // const decoded = Buffer.from(decrypted).toString("utf8");
  const decoded = decoder.decode(decrypted);
  return decoded;
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// function base64URLdecode(str: string): string[] {
//   const base64Encoded = str.replace(/-/g, "+").replace(/_/g, "/");
//   const padding = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
//   const base64WithPadding = base64Encoded + padding;
//   return atob(base64WithPadding)
//     .split("")
//     .map((char) => String.fromCharCode(char.charCodeAt(0)));
// }

// function base64URLencode(str: string) {
//   const utf8Arr = new TextEncoder().encode(str);
//   const base64Encoded = btoa(utf8Arr);
//   return base64Encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
// }
