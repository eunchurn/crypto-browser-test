"use client";

import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { importKeyClient, decryptClient } from "@/shared/crypto/client";

export function GetPayload(): JSX.Element {
  const cookies = useCookies();
  const keyStr = cookies.get("clev-key");
  const dataStr = cookies.get("clev-data");
  const encryptedPayload = cookies.get("clev-game");
  const [state, setState] = useState("");
  useEffect(() => {
    if (!encryptedPayload) return;
    const payloadString = decodeURIComponent(encryptedPayload);
    // 암호화 알고리즘과 키 길이
    const algorithm = "AES-CBC";
    const keyLength = 256;

    // 랜덤 암호화 키 생성
    const encryptionKey = window.crypto.getRandomValues(
      new Uint8Array(keyLength / 8)
    );
    const [iv, encrypted] = payloadString.split(":");
    const ivBytes = Uint8Array.from(Buffer.from(iv, "hex"));
    console.log({ iv, encrypted, ivBytes });
    // Web Crypto API를 사용하여 데이터 복호화
    window.crypto.subtle
      .importKey(
        "raw",
        encryptionKey,
        { name: algorithm, length: keyLength },
        false,
        ["decrypt"]
      )
      .then((key) =>
        window.crypto.subtle.decrypt(
          {
            name: algorithm,
            iv: ivBytes,
          },
          key,
          Uint8Array.from(Buffer.from(encrypted, "base64"))
        )
      )
      .then((decrypted) => {
        const gameData = Buffer.from(decrypted).toString("utf8");
        // console.log("Decrypted game data:", gameData);
        setState(gameData);
        // 게임 로직 처리
      })
      .catch((err) => {
        console.error(err);
      });
  }, [encryptedPayload]);
  useEffect(() => {
    if (!keyStr || !dataStr) return;
    getData(keyStr, dataStr).then(console.log).catch(console.log);
  }, [keyStr, dataStr]);
  return <div>{state}</div>;
}

async function getData(keyStr: string, dataStr: string): Promise<string> {
  const keyJsonStr = decodeURIComponent(atob(keyStr));
  const key = keyParse(keyJsonStr);
  const dataJsonStr = decodeURIComponent(atob(dataStr));
  const { iv, value } = dataParse(dataJsonStr);
  const importedKey = await importKeyClient(key);
  const result = await decryptClient({ key: importedKey, iv, value });
  return result;
}

function keyParse(str: string): JsonWebKey {
  return JSON.parse(str) as JsonWebKey;
}

function dataParse(str: string): { iv: string; value: string } {
  return JSON.parse(str) as { iv: string; value: string };
}
