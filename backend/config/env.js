const config = {
        mongo: {
            uri: 'mongodb+srv://karan:test123@cluster0.khxpt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            options: {
                debug: false
            }
        },
        jwtConfig: {
            secret : 'dawhdghaduiawajdajdiaduiahfweafa',
        },
        corsOptions: {
            origin:'*', 
            credentials:true,            
            optionSuccessStatus:200,
        }
    }


module.exports = config;

