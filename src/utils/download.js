export default async function download(id) {
  const res = await Agent.download(id)
  const { name } = await Agent.metadata(id)
  const type = res.headers.get('Content-Type')
  const blob = new Blob([ await res.blob() ], { type }) 
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
}