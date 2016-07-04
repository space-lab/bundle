import ui from 'redux-ui'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Content, Bundle, Editable } from 'components'
import { Header, AddLink } from 'containers'
import { NEW_BUNDLE_ID, NEW_LINK_ID } from 'constants'
import { linksWithoutAuthors } from 'helpers'
import * as bundleActions from 'actions/Bundle'
import * as linkActions from 'actions/Link'

const connectState = (state) => ({
  bundle: state.Bundle.getIn(['byId', NEW_BUNDLE_ID]),
  currentLink: state.Link.getIn(['current', NEW_LINK_ID]),
  links: state.Link.get('byId'),
  users: state.User.get('byId')
})

const connectProps = {
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

  removeLink (index) {
    let { bundle, removeLinkFromBundle } = this.props
    removeLinkFromBundle(bundle.id, index)
  }

  render () {
    let { bundle, currentLink, links, ui, updateUI } = this.props

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
          currentLink={currentLink}
          links={links} />

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

    //return <Bundle
      //{...this.props}
      //bundle={currentBundle}
      //handleChange={updateBundleInfo}
      //handleLinkEdit={updateLink}
      //handleLinkRemove={::this.removeLink}
      //toggleEdit={::this.saveBundle}
    ///>
  }
}
