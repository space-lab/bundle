import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import ToggleEditMode from './ToggleEditMode'
import { ChangeCollection } from 'components'
import ShareBundle from './ShareBundle'
import * as shareActions from 'actions/Share'
import * as userAutocompleteActions from 'actions/UserAutocomplete'

import './index.css'

const connectState = (state) => ({
  userAutocomplete: state.UserAutocomplete
})

const connectProps = {
  ...userAutocompleteActions,
  ...shareActions
}

@connect(connectState, connectProps)
export default class BundleViewHeader extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record,
    toggleEdit: React.PropTypes.func,
    collections: ImmutablePropTypes.map,
    updateBundle: React.PropTypes.func,
    changeSharePermission: React.PropTypes.func,
    inviteUsers: React.PropTypes.func,
    getShareUrl: React.PropTypes.func.isRequired
  }

  renderNewBundleHeader () {
    const { ui, toggleEdit } = this.props

    return (
      <div className='bundle-view-header-wrapper'>
        <div className='align-right'>
          <ToggleEditMode editMode={ui.editMode} toggleEdit={toggleEdit}/>
        </div>
      </div>
    )
  }

  renderViewBundleHeader () {
    const { ui, bundle, toggleEdit, collections } = this.props

    return (
      <div className='bundle-view-header-wrapper'>
        <ChangeCollection
          bundle={bundle}
          collections={collections}
          updateBundle={this.props.updateBundle}/>

        <div className='align-right'>
          <ShareBundle
            {...this.props}
            resourceName='Bundle'
            resource={this.props.bundle}/>

          <ToggleEditMode editMode={ui.editMode} toggleEdit={toggleEdit}l/>
        </div>
      </div>
    )
  }

  render () {
    const { bundle } = this.props

    return bundle.isNewBundle
      ? this.renderNewBundleHeader()
      : this.renderViewBundleHeader()
  }
}
