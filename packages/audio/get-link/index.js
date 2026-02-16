const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

async function main(args) {
    // 1. Initialize the connection using your Environment Variables
        const s3Client = new S3Client({
        endpoint: process.env.SPACES_ENDPOINT, 
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.SPACES_KEY, // Corrected: accessKeyId (no underscore)
            secretAccessKey: process.env.SPACES_SECRET,
        },
    });


    // 2. Specify the file you want to unlock (sent from your HTML/JS)
    const bucketParams = {
        Bucket: process.env.SPACES_BUCKET,
        Key: args.fileName || "default.mp3", 
    };

    try {
        const command = new GetObjectCommand(bucketParams);
        
        // 3. Generate a signed URL that expires in 60 seconds
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

        return {
            body: { url: signedUrl },
            statusCode: 200,
            headers: { "Content-Type": "application/json" }
        };
    } catch (err) {
        return {
            body: { error: err.message },
            statusCode: 500
        };
    }
}

// DigitalOcean looks for 'main' to start the function
exports.main = main;
