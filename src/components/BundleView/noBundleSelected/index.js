import { Autocomplete } from 'components'

export default function noBundleSelected () {
  return <div>
    No Bundle Selected...
    <br/>
    <br/>
    <br/>

    <Autocomplete emails={[]} />
  </div>
}
