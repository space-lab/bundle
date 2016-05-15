import ImmutablePropTypes from 'react-immutable-proptypes'
import ToggleBundleButton from '../ToggleBundleButton'
import { ChangeCollection, ShareBundle } from '../../../components'
import './index.css'

export default class BundleViewHeader extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record,
    toggleEdit: React.PropTypes.func,
    collections: ImmutablePropTypes.map,
    updateBundle: React.PropTypes.func,
    changeSharePermission: React.PropTypes.func
  }

  render () {
    let { ui, bundle, toggleEdit, collections } = this.props

    if (bundle.isNewBundle) {
      return (
       <div className='bundle-view-header-wrapper'>
         <ToggleBundleButton editMode={ui.editMode} toggleEdit={toggleEdit} />
       </div>
     )
    }

    return (
      <div className='bundle-view-header-wrapper'>
        <ChangeCollection
          bundle={bundle}
          collections={collections}
          updateBundle={this.props.updateBundle}
        />

        <ShareBundle
          bundle={bundle}
          changeSharePermission={this.props.changeSharePermission}
        />

        <ToggleBundleButton editMode={ui.editMode} toggleEdit={toggleEdit} />
      </div>
    )
  }
}
