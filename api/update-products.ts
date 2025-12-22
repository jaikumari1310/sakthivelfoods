
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

// Environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
const GITHUB_REPO = process.env.VERCEL_GIT_REPO_SLUG;
const GITHUB_OWNER = process.env.VERCEL_GIT_REPO_OWNER;
const FILE_PATH = 'src/data/products.json';
const GIT_BRANCH = 'main';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    // 1. Validate server-side environment variables
    if (!GITHUB_TOKEN || !ADMIN_API_KEY || !GITHUB_REPO || !GITHUB_OWNER) {
      console.error('CRITICAL: Missing one or more required environment variables on the server.');
      return response.status(500).json({ message: 'Server configuration error.' });
    }

    // 2. Validate request method
    if (request.method !== 'POST') {
      return response.status(405).json({ message: 'Only POST requests are allowed' });
    }

    // 3. Validate request body and API Key
    const { jsonData, apiKey } = request.body;
    if (apiKey !== ADMIN_API_KEY) {
      console.error('Bad Request: Invalid API Key provided.');
      return response.status(401).json({ message: 'Invalid API Key.' });
    }
    if (!jsonData) {
      console.error('Bad Request: Missing jsonData in request body.');
      return response.status(400).json({ message: 'Missing jsonData in request body.' });
    }

    // 4. Initialize GitHub client
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const content = Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64');
    
    // 5. Get current file SHA from GitHub
    let currentSha: string | undefined;
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: FILE_PATH,
        ref: GIT_BRANCH,
      });

      if (Array.isArray(fileData) || !('sha' in fileData)) {
         throw new Error('Path resolved to multiple files or is not a file.');
      }
      currentSha = fileData.sha;
    } catch (error: any) {
      if (error.status !== 404) {
        throw error; // Not a "file not found" error
      }
    }

    // 6. Commit the file update to GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: FILE_PATH,
      message: 'Automated inventory update',
      content: content,
      sha: currentSha,
      branch: GIT_BRANCH,
    });

    // 7. Send success response
    return response.status(200).json({ message: 'Products updated successfully. Vercel deployment triggered.' });

  } catch (error: any) {
    console.error('--- MASTER ERROR HANDLER CAUGHT ---', error);
    return response.status(500).json({ 
        message: 'The operation failed. See error details.', 
        error: error.message || 'An unknown server error occurred.'
    });
  }
}
