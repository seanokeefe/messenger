import React from 'react';
import PropTypes from 'prop-types';
import { AppContextConsumer } from '../containers/Page'

const MessageForm = (props) => (
    <AppContextConsumer>
        {(context) => {
            return (
            <div className={'fixed bottom-0 w-100'}>
                <div className={'flex'}>
                    <input
                        className={'large p2 flex-auto'}
                        value={context.inputVal}
                        onChange={props.onUpdateInput}
                        onKeyDown={(e) => 
                        {
                            // Send message on ENTER
                            if (e.keyCode === 13) {
                                return props.onSend(e);
                            };
                        }
                    } />
                    <button className={'large gray-bg light-gray p2'} onClick={props.onSend}>{'Send'}</button>
                </div>
            </div>
            )
        }}
    </AppContextConsumer>);

MessageForm.propTypes = {
    onSend: PropTypes.func.isRequired,
    onUpdateInput: PropTypes.func.isRequired,
};

export default MessageForm;
