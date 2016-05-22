import ImmutablePropTypes from 'react-immutable-proptypes'
import ToggleEditMode from './ToggleEditMode'
import { ChangeCollection, ShareBundle } from 'components'
import './index.css'

export default class BundleViewHeader extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record,
    toggleEdit: React.PropTypes.func,
    collections: ImmutablePropTypes.map,
    updateBundle: React.PropTypes.func,
    changeSharePermission: React.PropTypes.func,
    inviteUsers: React.PropTypes.func
  }

  renderNewBundleHeader () {
    let { ui, toggleEdit } = this.props

    return (
      <div className='bundle-view-header-wrapper'>
        <div className='align-right'>
          <ToggleEditMode editMode={ui.editMode} toggleEdit={toggleEdit} />
        </div>
      </div>
    )
  }

  renderViewBundleHeader () {
    let { ui, bundle, toggleEdit, collections } = this.props

    return (
      <div className='bundle-view-header-wrapper'>
        <ChangeCollection
          bundle={bundle}
          collections={collections}
          updateBundle={this.props.updateBundle}
        />

        <div className='align-right'>
          <ShareBundle
            bundle={bundle}
            changeSharePermission={this.props.changeSharePermission}
            inviteUsers={this.props.inviteUsers}
          />

          <ToggleEditMode
            editMode={ui.editMode}
            toggleEdit={toggleEdit}
          />
        </div>
      </div>
    )
  }

  render () {
    let { bundle } = this.props

    return bundle.isNewBundle
      ? this.renderNewBundleHeader()
      : this.renderViewBundleHeader()
  }
}
