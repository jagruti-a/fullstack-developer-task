const app = require('./app');
const { initDB } = require('./config/database');

const PORT = 3000;

const startServer = async () => {
    try {
        await initDB(); 
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1); 
    }
};

startServer();
