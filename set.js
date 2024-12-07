const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU9JeXVLYzB6cmdIRWI1SkthZGRkVWhGRnByUTAwTWZwM3UvemVBd0ZIQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoielB5ck9SN0pmS3kzZ08yWjVGNlFPV3JxS0FrNDlPMjVPSjQ4WFE0eXEyST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrR3VSUHBoamo1ckk4TDFkcHhxZm1NZS96aGlkdlgxa05lUzJMWHozSWswPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxdWZnbjRKYkdPWVhZcWcxOGtQMjdpMmREbGt1cTB5YnVUclE2OUpxbjJBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVOU1VkdzBSVzh5S2h1OStTcXFsMTAyM1BTU0w2cjJQVmcxazhOTFNUbE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBaV3RpbzAwYk1YalVuNEYrcGxGV2VPTWYzMWdJVjNwVGJpREwxdG4zMlk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0JwdklSZnloMGdvM29iM3NQcVpvck5kcWdra3pkVFcxZHZ5YVpuV2ZXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0xHZXFrS3lzSjBUZCs5SGRLemtEZXJCWFkxdWhGZlBzaU4vcHB4R0hIND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpyelFjMVdsSndjRjBaWTNjNkEyeVp6SGlrVHNZa0p2V0RLQmtqZ1FKVlRVaTEvLy9Fc091bW9xQXBtN24wNFFjMkZaRlVuYzlTejV1dnk3c0tJVGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUwLCJhZHZTZWNyZXRLZXkiOiI3eFYxME1MS1VWMU5EaGo2NWw5ZWRwNFJVVmxmUWRLSEo2SEZ5RGZxKzZFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJlUzJVVzFLY1RiQ0tyNE0xM3E4YVdnIiwicGhvbmVJZCI6Ijc3OTI4MTU3LTk0OTYtNGUwNC05NjI2LTNkOTJhMDc4Y2Q1YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvOGU5RlcvTTkvY1VIem1EdE4yV1NMK05LRlU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTE5yTzZrcHRPZlJnT0ZYV2Y3NnBCYW9IYU5ZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IllQWllDUzY5IiwibWUiOnsiaWQiOiIyNzc0MzI2Njc4OToyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkthdGFrdXJpIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOVzEvcXdERVB6Ung3b0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJJOTFsU0FtenE0UThGMkwwZ3NVMC93bVdEWnZwU29uNXBxSUcvU2VlRGdnPSIsImFjY291bnRTaWduYXR1cmUiOiJPcUdZai91NFl1VlA2cDRsczNrRHZYcllnM0hEeXFibVpmSXVtOTRtNWM0U0daOUJLWkdtMDZVRTBEZXZSREdCV25UZnRKcm1ZZFA1Tytoa2NaMzhCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUmFhWTdyNmZZTFJEU1FMNFZvakNDbzd5dHpETFhqeTRRVUVKVmVLbUQ1T0lIS3RRT2pkRGRKUGo0WjJPTGJrMDBmRGJSNmNDU08zZlVZalowRCszaGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzc0MzI2Njc4OToyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNQZFpVZ0pzNnVFUEJkaTlJTEZOUDhKbGcyYjZVcUorYWFpQnYwbm5nNEkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzM0MjEzMjEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBREdtIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Phantom",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27748255848",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Phantom-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/uuye39.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
