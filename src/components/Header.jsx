import React from 'react';
import PropTypes from 'prop-types';
import { AppContextConsumer } from '../containers/Page'

const Header = (props) => (
    <AppContextConsumer>
        {(context) => {
            return (
                <div className={'gray-bg'}>
                    <div className={'right-align'}><button onClick={props.onAddClient}>{'add client +'}</button></div>
                    <div className={'p1 pb3 flex justify-around small light-gray'}>
                        <div><h5>{'Connection status:'}</h5> {context.socket.connected ? 'Service Connected' : 'Service Disconnected'}</div>
                        <div><h5>{'Current User:'}</h5>{context.user.name}</div>
                        <div>
                            <h5>{`Connected Users: ${context.users.filter(u => u !== null).length}`}</h5>
                                <div className={'overflow-block overflow-scroll'}>
                                {context.users
                                    .filter(u => u !== null)
                                    .map(u => <div key={u.name}>{u.name}</div>)}
                                </div>
                        </div>
                    </div>
                </div>
            )
        }}
    </AppContextConsumer>
);

Header.propTypes = {
    onAddClient: PropTypes.func.isRequired,
  };

export default Header;
