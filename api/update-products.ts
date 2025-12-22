
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

// Environment variables pulled from Vercel's System Environment Variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.VERCEL_GIT_REPO_SLUG; // e.g., 'sakthivelfoods'
const GITHUB_OWNER = process.env.VERCEL_GIT_REPO_OWNER; // e.g., 'jaikumari1310'
const FILE_PATH = 'src/data/products.json';
const GIT_BRANCH = 'main';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // MASTER TRY/CATCH: Guarantees a JSON response is always sent.
  try {
    console.log('Update products function invoked.');

    // 1. Validate environment variables
    if (!GITHUB_TOKEN) {
      console.error('CRITICAL: GITHUB_TOKEN is not defined.');
      return response.status(500).json({ message: 'Server configuration error: GITHUB_TOKEN is not set.' });
    }
    if (!GITHUB_REPO) {
      console.error('CRITICAL: VERCEL_GIT_REPO_SLUG is not defined.');
      return response.status(500).json({ message: 'Server configuration error: Git repository slug is missing.' });
    }
    if (!GITHUB_OWNER) {
      console.error('CRITICAL: VERCEL_GIT_REPO_OWNER is not defined.');
      return response.status(500).json({ message: 'Server configuration error: Git repository owner is missing.' });
    }
    console.log(`Operating on repository: ${GITHUB_OWNER}/${GITHUB_REPO}`);

    // 2. Validate request method
    if (request.method !== 'POST') {
      console.log(`Blocked non-POST request. Method: ${request.method}`);
      return response.status(405).json({ message: 'Only POST requests are allowed.' });
    }

    // 3. Validate request body
    const { jsonData } = request.body;
    if (!jsonData) {
      console.error('Bad Request: Missing jsonData in request body.');
      return response.status(400).json({ message: 'Missing jsonData in request body.' });
    }

    // 4. Initialize GitHub client
    let octokit;
    try {
      octokit = new Octokit({ auth: GITHUB_TOKEN });
      console.log('Octokit client initialized successfully.');
    } catch (initError: any) {
      console.error('Failed to initialize Octokit client:', initError.message);
      return response.status(500).json({ message: 'Failed to initialize GitHub client.', error: initError.message });
    }

    // 5. Get current file SHA from GitHub
    let currentSha: string | undefined;
    try {
      console.log(`Fetching content for: ${FILE_PATH}`);
      const { data: fileData } = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: FILE_PATH,
        ref: GIT_BRANCH,
      });
      console.log('Successfully fetched file content.');

      if (Array.isArray(fileData) || !('sha' in fileData)) {
        throw new Error('Path resolved to multiple items or is not a file.');
      }
      currentSha = fileData.sha;
      console.log(`Found existing file with SHA: ${currentSha}`);
    } catch (error: any) {
      if (error.status === 404) {
        console.log('File not found. This will be a new file creation.');
        currentSha = undefined; // Ensure SHA is undefined for creation
      } else {
        console.error(`Error fetching file content (Status: ${error.status}):`, error.message);
        throw new Error(`Failed to get file content from GitHub: ${error.message}`);
      }
    }

    // 6. Encode new content
    const content = Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64');

    // 7. Commit the file update to GitHub
    try {
      console.log(`Attempting to create or update file contents...`);
      await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: FILE_PATH,
        message: 'Automated inventory update',
        content: content,
        sha: currentSha, // Undefined for new files, defined for updates
        branch: GIT_BRANCH,
      });
      console.log('Successfully created/updated file on GitHub.');
    } catch (updateError: any) {
      console.error(`Error updating file on GitHub (Status: ${updateError.status}):`, updateError.message);
       if (updateError.status === 401) {
          throw new Error('GitHub authentication failed. Your GITHUB_TOKEN is likely invalid or has insufficient permissions (requires `repo` scope).');
       } else if (updateError.status === 409) {
          throw new Error('Conflict: The file has been updated by another process. Please try again.');
       }
      throw new Error(`Failed to commit file to GitHub: ${updateError.message}`);
    }

    // 8. Send success response
    return response.status(200).json({ message: 'Products updated successfully. Vercel deployment triggered.' });

  } catch (error: any) {
    // This is the final safety net. It catches any error thrown from the steps above.
    console.error('--- MASTER ERROR HANDLER CAUGHT ---');
    console.error(error);
    return response.status(500).json({ 
        message: 'The operation failed. See error details.', 
        error: error.message || 'An unknown server error occurred.'
    });
  }
}
