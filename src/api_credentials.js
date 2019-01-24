api_credentials = {
    token: null,
    token_type: null,

    load: function(){
        if (api_credentials.token === null)
            api_credentials.load_from_store();
    },

    load_from_store: function(){
        api_credentials.token = localStorage.getItem('token');
        api_credentials.token_type = localStorage.getItem('token_type');
    },

    store: function(token, token_type){
        localStorage.setItem('token', token);
        localStorage.setItem('token_type', token_type);

        api_credentials.token = localStorage.getItem('token');
        api_credentials.token_type = localStorage.getItem('token_type');
    },

    clear: function(){
        api_credentials.token = null;
        api_credentials.token_type = null;

        localStorage.removeItem('token');
        localStorage.removeItem('token_type');
    }
};