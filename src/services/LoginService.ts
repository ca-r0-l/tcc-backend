import crypto from "crypto";

function generateRandomString(length: number) {  
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);  
}  

function sha512(password: string, salt: string) {  
    const hash = crypto.createHmac('sha512', salt);  
    hash.update(password);  
    const value = hash.digest('hex');  
    return {  
        salt: salt,  
        passwordHash: value  
    }  
}  
  
function saltHashPassword(userPassword: string) {  
    const salt = generateRandomString(16);  
    const passwordData = sha512(userPassword, salt);  
    return passwordData;
}  
  
function checkHashPassword(userPassword: string, salt: string) {  
    const passwordData = sha512(userPassword, salt);  
    return passwordData;  
}

export {
    saltHashPassword,
    checkHashPassword
}
