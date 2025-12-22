
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

// Environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.VERCEL_GIT_REPO_SLUG || 'sakthivelfoods';
const GITHUB_OWNER = process.env.VERCEL_GIT_REPO_OWNER || 'jaikumari1310';
const FILE_PATH = 'src/data/products.json';
const GIT_BRANCH = 'main';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Wrap the entire function in a try/catch to guarantee a JSON response
  try {
    if (request.method !== 'POST') {
      return response.status(405).json({ message: 'Only POST requests are allowed' });
    }

    // Check for the GitHub token inside the handler
    if (!GITHUB_TOKEN) {
      console.error('Missing GITHUB_TOKEN environment variable');
      return response.status(500).json({ message: 'Server configuration error: GITHUB_TOKEN is not set.' });
    }

    const { jsonData } = request.body;
    if (!jsonData) {
      return response.status(400).json({ message: 'Missing jsonData in request body' });
    }

    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const content = Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64');
    
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
        throw error; // Rethrow if it's not a "file not found" error
      }
      // If file doesn't exist, currentSha remains undefined, which is correct for creation.
    }

    // Create or update the file
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: FILE_PATH,
      message: 'Automated inventory update',
      content: content,
      sha: currentSha,
      branch: GIT_BRANCH,
    });

    return response.status(200).json({ message: 'Products updated successfully. Vercel deployment triggered.' });

  } catch (error: any) {
    console.error('--- Top-level error caught ---');
    console.error(error);
    
    // Default error message
    let errorMessage = 'An unexpected error occurred.';

    // Check for specific Octokit/GitHub errors
    if (error.status === 401) {
      errorMessage = 'GitHub authentication failed. Please verify your GITHUB_TOKEN is correct and has repo scope.';
    } else if (error.status === 404) {
       errorMessage = 'GitHub repository or file not found. Please check repository name and permissions.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return response.status(500).json({ message: 'Failed to update products.json on GitHub.', error: errorMessage });
  }
}
