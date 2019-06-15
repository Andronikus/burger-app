import React from 'react';
import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Auxiliary>
            <BackDrop show={props.show} clicked={props.modalClosed}></BackDrop>
            <div
                className={classes.Modal}
                style={
                    {
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }
                }
            >
                {props.children}
            </div>
        </Auxiliary>
    );
}

const areEqual = (prevProps, nextProps) => {return nextProps.show === prevProps.show && nextProps.children === prevProps.children}

export default React.memo(modal, areEqual);