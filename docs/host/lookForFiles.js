document.addEventListener('DOMContentLoaded', () => {
    const owner = 'catzgaming2012';
    const repo = 'catzgaming2012.github.io';
    const initialPath = 'docs/host'; // The API path to fetch from
    const baseUrl = `https://${owner}.github.io/`; // The base URL of your website

    // The segment we need to remove from the API path ('docs/')
    // The path on the server is '/host/...'
    const pathToRemove = 'docs/'; 

    const fileListElement = document.getElementById('file-list');

    /**
     * Cleans the full GitHub API path (e.g., 'docs/host/a/b.js') 
     * to construct the final web URL (e.g., 'https://...github.io/host/a/b.js').
     * @param {string} fullPath The item.path from the GitHub API (e.g., 'docs/host/file.txt').
     */
    function constructWebUrl(fullPath) {
        // 1. Remove ONLY the 'docs/' prefix from the full path.
        // We use replace() with a RegEx to ensure we only remove it from the beginning.
        let sitePath = fullPath.replace(new RegExp(`^${pathToRemove}`, 'i'), '');
        
        // 2. Construct the final URL using the base URL.
        // If fullPath was 'docs/host/a/b.js', sitePath is 'host/a/b.js'
        // Final URL: https://catzgaming2012.github.io/host/a/b.js
        return baseUrl + sitePath;
    }

    async function fetchFilesRecursively(currentPath) {
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${currentPath}`;

        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('GitHub API Rate Limit Exceeded or Forbidden.');
                }
                throw new Error(`Failed to fetch ${currentPath}: ${response.statusText}`);
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                for (const item of data) {
                    
                    // Handle Directories Recursively
                    if (item.type === 'dir') {
                        // RECURSIVE STEP: Immediately call for subfolders
                        await fetchFilesRecursively(item.path);
                        continue; // Skip file listing for directories
                    }
                    
                    // --- Link Construction Logic ---
                    const websiteLink = constructWebUrl(item.path);
                    // -------------------------------
                    
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');

                    // Display the path on the website, which starts with 'host/'
                    // This removes the 'docs/' prefix for display purposes.
                    link.textContent = item.path.replace(new RegExp(`^${pathToRemove}`, 'i'), '');
                    link.href = websiteLink; 
                    
                    listItem.classList.add('file');
                    listItem.innerHTML = '📄 ';
                    
                    listItem.appendChild(link);
                    fileListElement.appendChild(listItem);
                }
            }
        } catch (error) {
            console.error('Error fetching files:', error);
            const errorItem = document.createElement('li');
            errorItem.textContent = `Error loading contents from ${currentPath}: ${error.message}`;
            fileListElement.appendChild(errorItem);
        }
    }

    // Clear the loading message before starting
    fileListElement.innerHTML = '';
    
    // Start the process
    fetchFilesRecursively(initialPath);
});