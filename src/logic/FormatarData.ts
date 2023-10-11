export default function FormatarData() {
  const data = new Date().toLocaleDateString()
  const day = data.substring(0, 2)
  const mouth = data.substring(3, 5)
  const year = data.substring(6, 10)
  const dataFormatada = `${year}/${mouth}/${day}`

  return dataFormatada
}