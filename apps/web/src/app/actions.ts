"use server";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { generateKey, exportKey, encrypt } from "@/shared/crypto/server";

export async function create(): Promise<void> {
  const key = await generateKey(["encrypt", "decrypt"]);
  const exportedKey = await exportKey(key);
  const secret = await encrypt(key, "this is secret");
  cookies().set({
    name: "clev-key",
    value: btoa(JSON.stringify(exportedKey)),
    path: "/",
  });
  cookies().set({
    name: "clev-data",
    value: btoa(JSON.stringify(secret)),
    path: "/",
  });

  // 게임 데이터 (예시)
const gameData = 'WORDGAME';

// 32바이트 길이의 암호화 키 생성
const encryptionKey = crypto.randomBytes(32);

// 암호화 알고리즘과 키로 초기화
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16); // 초기화 벡터
const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);

// 데이터 암호화
let encrypted = cipher.update(gameData, 'utf8', 'base64');
encrypted += cipher.final('base64');

// 암호화된 데이터와 초기화 벡터를 클라이언트로 전송 (예: 쿠키에 저장)
const encryptedPayload = `${iv.toString('hex')}:${encrypted}`;
cookies().set({
  name: "clev-game",
  value: encryptedPayload,
  path: "/",
});
}
