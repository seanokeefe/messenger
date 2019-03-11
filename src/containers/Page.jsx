import React from 'react';
import Header from '../components/Header';
import Messages from '../components/Messages';
import MessageForm from '../components/MessageForm';
import openSocket from 'socket.io-client';

// create a UserContext for setting Provider to pass user state
const AppContext = React.createContext();

class Page extends React.Component {
    constructor() {
        super();

        this.state = {
            socket: openSocket('http://localhost:3001'),
            inputVal: '',
            msgs: [],
            user: {
                id: '',
                name: '',
            },
            users: [],
        }

        // Socket updates for messages
        this.state.socket.on('msg', msg => {
            // Scroll to latest messages if container is overflowing
            const node = document.querySelector('.message-container');
              if (node) {
                node.scrollTo({
                  top: node.offsetHeight,
                  left: 0,
                  behavior: 'smooth',
                });
              };

            // only keep tha last 25 messages
            const numMessages = 25;
            const truncatedMsgs = this.state.msgs.slice(this.state.msgs.length - numMessages, this.state.msgs.length)

            // If he number of message is greater than the threshold update the state with the truncted list
            this.setState({ msgs: this.state.msgs.length < numMessages ? this.state.msgs.concat(msg): truncatedMsgs.concat(msg) });
        });      

        // Socket updates for current user
        this.state.socket.on('user', user => {
            this.setState({ user });
        });      

        // Socket updates for full user list
        this.state.socket.on('users', users => {
            this.setState({ users});
        });

        this.onAddClient = this.onAddClient.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onUpdateInput = this.onUpdateInput.bind(this);

    }
    
    /**
    * Opens new client window
    *
    * @return {Object}
    */
    onAddClient = () => {
        return window.open('/', '_blank', 'toolbar, location, menubar, status');
    };
    
    /**
    * Send message to server and clear input value state
    *
    * @return {Object}
    */
    onSend = () => {
        this.state.socket.emit('send', this.state.inputVal, this.state.user);
        return this.setState({ inputVal: '' });
    };

    /**
    * Update local state with input value
    *
    * @param  {String} inputVal
    * @return {Object}
    */
    onUpdateInput = (inputVal) => {
        return this.setState({ inputVal: inputVal.target.value });
    };
    
    render() {
        return (
            <AppContext.Provider value={this.state}>
                <div className={'flex flex-column'}>
                    <Header onAddClient={this.onAddClient} />
                    <Messages />
                    <MessageForm onUpdateInput={this.onUpdateInput} onSend={this.onSend} />
                </div>
            </AppContext.Provider>
        )
    }
}

export default Page;

// make context consumer available to other components,
// Provider/Consumer context could be moved to a separate file instead
export const AppContextConsumer = AppContext.Consumer;