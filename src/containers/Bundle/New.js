import ui from 'redux-ui'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Content, Bundle, Editable, Link, AddLink } from 'components'
import { Header } from 'containers'
import Selectors from 'selectors'
import { nextId } from 'helpers'
import { NEW_BUNDLE_ID, NEW_LINK_ID } from 'constants'
import { linksWithoutAuthors } from 'helpers'
import * as bundleActions from 'actions/Bundle'
import * as linkActions from 'actions/Link'

let connectState = (state) => ({
  bundle: Selectors.currentBundle(state),
  links: Selectors.links(state),
  users: Selectors.users(state),
  currentUser: Selectors.currentUser(state),
  currentLink: Selectors.currentLink(state)
})

let connectProps = {
  ...bundleActions,
  ...linkActions
}

@ui({
  key: 'bundleNew',
  state: {
    name: '',
    description: '',
    editMode: true
  }
})
@connect(connectState, connectProps)
export default class BundleNewContainer extends React.Component {
  componentWillMount () {
    this.props.generateNewBundle()
  }

  // TODO, tie this up.
  saveBundle () {
    let { bundle, links, createBundle, ui } = this.props
    let bundleLinks = bundle.links.map(id => links.get(id).delete('id'))

    let payload = {
      name: ui.name,
      description: ui.description,
      links_attributes: linksWithoutAuthors(bundleLinks)
    }

    createBundle(payload).then(bundle => {
      let newBundleRoutePath = `/bundle/${bundle.id}`
      browserHistory.push(newBundleRoutePath)
    })
  }

  handleLinkAdd (link) {
    let payloadLink = link.toJS()
    let {
      currentUser,
      bundle,
      links,
      clearCurrentLink,
      updateBundle,
      addCurrentLinkToBundle
    } = this.props

    payloadLink.creator_id = currentUser.id

    let payload = {
      links_attributes: [payloadLink]
    }

    if (bundle.isNewBundle) {
      let linkWithCreator = link
        .set('creator', currentUser.id)
        .set('id', nextId(links))

      return addCurrentLinkToBundle(bundle.id, linkWithCreator)
    }

    updateBundle(bundle.id, payload)
    clearCurrentLink(bundle.id)
  }

  handleLinkRemove (index) {
    let { bundle, removeLinkFromBundle } = this.props
    removeLinkFromBundle(bundle.id, index)
  }

  render () {
    let { bundle, links, users, currentUser, currentLink,
      fetchLink, ui, updateUI } = this.props

    if (!bundle) return false

    // TODO remove toggleedit
    return <Content>
      <Header {...this.props} toggleEdit={() => 'noop'} />

      <Bundle>
        <Editable
          autoFocus
          value={bundle.name}
          placeholder='Name goes here...'
          editMode={ui.editMode}
          onChange={value => updateUI('name', value)} />

        <Editable
          type='textarea'
          value={bundle.description}
          placeholder='Description goes here...'
          editMode={ui.editMode}
          onChange={value => updateUI('description', value)} />

        <AddLink
          bundle={bundle}
          user={currentUser}
          link={currentLink}
          links={links}
          handleUrlEnter={url => fetchLink(url, bundle.id)}
          handleLinkAdd={link => this.handleLinkAdd(link)}
        />

        {bundle.get('links').map((id, index) => {
          let link = links.get(id)
          let user = users.get(link.creator)

          return <Link
            key={index}
            url={link.url}
            image={link.image}
            title={link.title}
            description={link.description || ''}
            createdAt={link.created_at}
            creatorName={user.name}
            creatorImage={user.image}
            handleLinkRemove={this.handleLinkRemove.bind(this, link.id)} />
        })}
      </Bundle>
    </Content>
  }
}
