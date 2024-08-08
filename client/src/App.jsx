import React from 'react';
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

import store from './store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '839322725534-5rol260heknftqvn96hh5ldtrlupi7j3.apps.googleusercontent.com';

function App() {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </GoogleOAuthProvider>
    );
}

export default App;
