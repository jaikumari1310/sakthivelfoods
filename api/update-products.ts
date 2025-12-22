
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.VERCEL_GIT_REPO_SLUG || 'sakthivelfoods';
const GITHUB_OWNER = process.env.VERCEL_GIT_REPO_OWNER || 'jaikumari1310';
const FILE_PATH = 'src/data/products.json';
const GIT_BRANCH = 'main';

if (!GITHUB_TOKEN) {
  throw new Error('Missing GITHUB_TOKEN environment variable');
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { jsonData } = request.body;

  if (!jsonData) {
    return response.status(400).json({ message: 'Missing jsonData in request body' });
  }

  try {
    // 1. Get the current SHA of the file
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
      // If the file doesn't exist, getContent will throw a 404, which is fine.
      // We'll just create the file. For other errors, we should fail.
      if (error.status !== 404) {
        throw error;
      }
    }

    // 2. Create or update the file
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: FILE_PATH,
      message: 'Automated inventory update',
      content: Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64'),
      sha: currentSha, // Provide the current SHA to update the existing file
      branch: GIT_BRANCH,
    });

    return response.status(200).json({ message: 'Products updated successfully. Vercel deployment triggered.' });

  } catch (error: any) {
    console.error(error);
    return response.status(500).json({ message: 'Failed to update products.json on GitHub.', error: error.message });
  }
}
