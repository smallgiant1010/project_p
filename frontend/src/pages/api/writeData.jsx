import fs from 'fs';
import path from 'path';

export default function handler(requests, response) {
    if(requests.method == "POST") {
        const data = requests.body;
        const filePath = path.join(process.cwd(), 'db', 'profileData.json');
        
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            const json = JSON.parse(fileData);
            json.push(data);
            fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
            response.status(200).json({ message: data});
        }
        catch(err) {
            console.log(err);
            response.status(405).json({ message: 'Data Unsuccessfully Written' });
        }
    }
    else {
        response.status(405).json({ message: 'Only POST requests are allowed' });
    }
}