import { cloneDeep } from 'lodash'
import DEFAULT_ATTRIBUTES from './DefaultAttributes'
import BaseMj from '../Base/mj'
import Schema from './Schema'
import Settings from './Settings'
import { TYPE_MJ_BASIC } from '../constant'
import BaseModel from '../Base'

export default class MjBasic extends BaseModel {
    static type = TYPE_MJ_BASIC

    tagName = 'mj-raw'

    defaultAttributes = cloneDeep(DEFAULT_ATTRIBUTES)
    
    content = 'How does this work'

    schema = Schema

    settings = Settings
}
