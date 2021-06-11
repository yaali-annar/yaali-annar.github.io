type PestoComponent = {
  name: string
  mandatory?: boolean
  options: string[]
}

type SelectedPestoComponent = {
  name: string
  option: string
}

export { PestoComponent, SelectedPestoComponent }
