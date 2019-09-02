
import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class Beer extends Model {
  static table = 'beers'

  @field('name') name
  @field('type') type
  @field('blg') blg
  @field('alco') alco
  @field('smell') smell
  @field('taste') taste
  @field('color') color
  @field('bitter') bitter
  @field('overall') overall
  @field('add_info') addInfo
  @field('index') index
}
