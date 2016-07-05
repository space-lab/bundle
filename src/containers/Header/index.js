import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Selectors from 'selectors'
import ToggleEditMode from './ToggleEditMode'
import { ChangeCollection } from 'components'
import * as shareActions from 'actions/Share'
import * as alertActions from 'actions/Alert'
import * as userAutocompleteActions from 'actions/UserAutocomplete'

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

  // TODO remove edit mode
  //renderEditButton () {
    //let props = this.props
    //if (!props.bundle.canEdit(props.currentUser.id)) return false

    //return <ToggleEditMode editMode={props.ui.editMode} toggleEdit={props.toggleEdit}/>
  //}

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

  render () {
    const { bundle } = this.props
    return this.renderNewBundleHeader()
  }
}
