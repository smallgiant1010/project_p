import fs from 'fs';
import path from 'path';

export default function handler(request, response) {
    if (request.method == 'GET') {
        const filePath = path.join(process.cwd(), 'db', 'profileData.json');
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileData);
            const data = jsonData.length > 0 ? jsonData[jsonData.length - 1] : {};
            response.status(200).json(data);
        }
        catch(err) {
            console.log(err)
            response.status(500).json({ message : "Object Not Located"})
        }
    }
    else {
        response.status(405).json({ message: 'Only GET requests are allowed' });
    }
    
}