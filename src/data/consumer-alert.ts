import uuid from 'uuid/v1'
import { pipe } from 'helpers'
import { data } from 'data/consumer-alert.json'
import { mapToArray, sortBy } from 'helpers/map-to-array'

export const consumerAlert: ConsumerAlert[] = data.map(
  ({ regisration_number, ...item }) => ({
    ...item,
    id: uuid(),
    registration_number: regisration_number,
  }),
)

export interface ConsumerAlert {
  id: string
  name: string
  registration_number: string
  added_date: string
  websites: string[]
}

export const keywords = (arr: ConsumerAlert[]): Map<string, number> =>
  arr.reduce((acc, item) => {
    const { name } = item

    const spliced = name.split(' ')

    spliced.forEach(str => {
      // if valid number then drop it
      if (!isNaN(+str)) {
        return
      }

      const smallCase = str.toLowerCase()

      if (!acc.get(smallCase)) {
        acc.set(smallCase, 0)
      }

      acc.set(smallCase, (acc.get(smallCase) || 0) + 1)
    })

    return acc
  }, new Map())

export const mostUsedWords = pipe(
  keywords,
  mapToArray,
  sortBy('v', 'desc'),
)(consumerAlert)