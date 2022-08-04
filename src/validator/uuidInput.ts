//UUID(v4)の形式に合っているかチェック
export const checkUuidValidity = (code: string): boolean => {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  const result = regex.test(code)
  return result
}
