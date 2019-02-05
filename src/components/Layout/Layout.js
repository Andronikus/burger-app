import React from 'react';
import Auxilary from '../../hoc/Auxilary'

const layout = ( props ) => (
    <Auxilary>
        <div> Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Auxilary>
)

export default layout;