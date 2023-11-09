import React from 'react';
import user from './Authorization/User';
export function Map() {
    return (
        <div>
            <header className="App-header">
                Hello {user.name} !
            </header>
        </div>
    );
}