import { ResourceNavigation } from 'components'

export default function Container () {
  return (
    <ResourceNavigation>
      <div className='notifications-navigation'>
        <ResourceNavigation.Header>
          <div className='title-and-actions'>
            <div className='top-nav'>
              <h2 className='title'>Notifications</h2>
            </div>
          </div>
        </ResourceNavigation.Header>
      </div>
    </ResourceNavigation>
  )
}
