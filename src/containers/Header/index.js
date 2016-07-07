import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Selectors from 'selectors'
import ToggleEditMode from './ToggleEditMode'
import { ChangeCollection } from 'components'
import ShareBundle from './ShareBundle'
import JoinBundle from './JoinBundle'
import * as shareActions from 'actions/Share'
import * as alertActions from 'actions/Alert'
import * as userAutocompleteActions from 'actions/UserAutocomplete'

import './index.css'

const connectState = (state) => ({
  currentUser: Selectors.currentUser(state),
  userAutocomplete: state.UserAutocomplete
})

const connectProps = {
  ...userAutocompleteActions,
  ...shareActions,
  ...alertActions
}

@connect(connectState, connectProps)
export default class BundleViewHeader extends React.Component {
  static propTypes = {
    bundle: ImmutablePropTypes.record,
    currentUser: ImmutablePropTypes.record,
    toggleEdit: React.PropTypes.func,
    collections: ImmutablePropTypes.map,
    updateBundle: React.PropTypes.func,
    changeSharePermission: React.PropTypes.func,
    inviteUsers: React.PropTypes.func,
    getShareUrl: React.PropTypes.func.isRequired
  }

  updateNewBundle (id, data) {
    this.props.updateBundleInfo(id, 'collection_id', data.collection_id)
  }

  renderEditButton () {
    let props = this.props
    if (!props.bundle.canEdit(props.currentUser.id)) return false

    return <ToggleEditMode editMode={props.ui.editMode} toggleEdit={props.toggleEdit}/>
  }

  renderShareButton () {
    let props = this.props
    if (!props.bundle.canShare(props.currentUser.id)) return false

    return <ShareBundle {...props} resourceName='Bundle' resource={props.bundle}/>
  }

  renderNewBundleHeader () {
    const { ui, toggleEdit, bundle, collections, currentUser } = this.props

    return (
      <div className='bundle-view-header-wrapper'>
        <ChangeCollection
          bundle={bundle}
          collections={collections}
          canChangeCollection={true}
          updateBundle={::this.updateNewBundle}/>

        <div className='align-right'>
          <ToggleEditMode editMode={ui.editMode} toggleEdit={toggleEdit}/>
        </div>
      </div>
    )
  }

  renderViewBundleHeader () {
    const { ui, bundle, currentUser, toggleEdit, collections } = this.props

    return (
      <div className='bundle-view-header-wrapper'>
        <ChangeCollection
          bundle={bundle}
          collections={collections}
          canChangeCollection={bundle.canChangeCollection(currentUser.id)}
          updateBundle={this.props.updateBundle}/>

        <div className='align-right'>
          <JoinBundle
            bundle={bundle}
            currentUserId={currentUser.id}
            joinUrlShare={this.props.joinUrlShare}
            addAlert={this.props.addAlert}/>


          {this.renderShareButton()}
          {this.renderEditButton()}
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
