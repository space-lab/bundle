import * as Link from './Link'
import * as User from './User'
import * as Route from './Route'
import * as Alert from './Alert'
import * as Share from './Share'
import * as Bundle from './Bundle'
import * as Search from './Search'
import * as Favorite from './Favorite'
import * as Collection from './Collection'
import * as UserAutocomplete './UserAutocomplete'

export const allActions = {
  ...Link
  ...User,
  ...Route,
  ...Alert,
  ...Share,
  ...Bundle,
  ...Search,
  ...Favorite,
  ...Collection,
  ...UserAutocomplete,
}
