import fs from 'fs';
import path from 'path';

export default function handler(requests, response) {
    if(requests.method == "POST") {
        const data = requests.body;
        const filePath = path.join(process.cwd(), 'db', 'profileData.json');
        
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileData);
            jsonData[0] = data;
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
            console.log(data);
            response.status(200).json(data);
        }
        catch(err) { 
            console.log(err);
            response.status(500).json({ message: 'Data Unsuccessfully Written' });
        }
    }
    else {
        response.status(405).json({ message: 'Only POST requests are allowed' });
    }
}