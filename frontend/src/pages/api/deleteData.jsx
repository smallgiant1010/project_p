import fs from 'fs';
import path from 'path';

export default function handler(request, response) {
    if (request.method === 'DELETE') {
        const filePath = path.join(process.cwd(), 'db', 'profileData.json');

        try {
            fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
            response.status(200).json({ message: 'All data has been deleted' });
        } catch (err) {
            console.log(err);
            response.status(500).json({ message: 'Failed to delete data' });
        }
    } else {
        response.status(405).json({ message: 'Only DELETE requests are allowed' });
    }
}