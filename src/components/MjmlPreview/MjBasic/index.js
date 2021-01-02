import React, { Component } from 'react'
import { connect } from 'react-redux'
import { assignIn } from 'lodash'

import { previewComponent } from '../../../hoc/previewComponent'
import MjBasicModel from '../../../models/MjModels/MjBasic'

function mapStateToProps(state, ownProps) {
    return {
        component: assignIn(new MjBasicModel(), ownProps.component)
    }
}

@connect(mapStateToProps)
@previewComponent()
class MjBasic extends Component {
    render() {
        const { component, getHtml, getIndex } = this.props

        return (
            <div id={getIndex()} >{component.content}</div>
        )
    }
}

export default MjBasic
