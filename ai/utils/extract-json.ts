export function extractJson(text: string) {
  const match = text.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error("JSON 추출 실패");
  }

  return JSON.parse(match[0]);
}