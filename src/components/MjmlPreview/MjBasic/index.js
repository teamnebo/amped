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
        const { extractComponentHtml, getHtml, getIndex } = this.props

        const _html = extractComponentHtml(getHtml().html)

        return (
            <div id={getIndex()} dangerouslySetInnerHTML={{ __html: _html }} />
        )
    }
}

export default MjBasic
