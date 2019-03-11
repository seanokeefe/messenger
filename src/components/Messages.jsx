import React from 'react';
import { AppContextConsumer } from '../containers/Page'

const Messages = () => (
    <AppContextConsumer>
        {(context) => {
            return (
                <div className={'m2'}>
                    <h2>{'Messages:'}</h2>
                    <div className={'m2 message-container overflow-scroll'}>
                        {context.msgs.map((msg, idx) =>
                            <div key={idx}>{msg.user}: {msg.content}</div>
                        )}
                    </div>
                </div>
            )
        }}
    </AppContextConsumer>);

export default Messages;
