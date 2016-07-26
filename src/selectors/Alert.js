import { createSelector } from 'reselect'

export const all = state => state.Alert
export const first = createSelector(all, alerts => alerts.first())
