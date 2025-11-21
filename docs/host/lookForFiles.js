document.addEventListener('DOMContentLoaded', () => {
    const owner = 'catzgaming2012'; // Replace with your GitHub username
    const repo = 'catzgaming2012.github.io'; // Replace with your repository name
    const initialPath = 'docs/host'; // The starting directory

    const fileListElement = document.getElementById('file-list');

    /**
     * Recursively fetches and displays files/folders from a given GitHub path.
     * @param {string} currentPath The path to fetch contents from (e.g., 'docs/host/subfolder').
     */
    async function fetchFilesRecursively(currentPath) {
        // Construct the full API URL for the current path
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${currentPath}`;

        try {
            const response = await fetch(apiUrl);
            
            // Check for rate limiting or other non-OK responses
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('GitHub API Rate Limit Exceeded or Forbidden.');
                }
                throw new Error(`Failed to fetch ${currentPath}: ${response.statusText}`);
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                // Loop through all items (files and directories) in the current folder
                for (const item of data) {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');

                    link.textContent = item.path; // Show the full path for clarity
                    
                    // Construct the correct URL for the file/folder
                    // If it's a file, use the HTML URL for direct access
                    if (item.type === 'file') {
                        link.href = window.location.href + String(item.name); 
                        listItem.classList.add('file');
                    } else if (item.type === 'dir') {
                        // For directories, it's often best to link to the GitHub folder page
                        link.href = item.html_url; 
                        listItem.classList.add('directory');
                    }

                    // Prepend the directory icon for directories
                    if (item.type === 'dir') {
                         listItem.innerHTML = '📁 ';
                    } else {
                         listItem.innerHTML = '📄 ';
                    }
                    
                    listItem.appendChild(link);
                    fileListElement.appendChild(listItem);
                    
                    if (item.type === 'dir') {
                        await fetchFilesRecursively(item.path);
                    }
                }
            } else {
                console.warn(`Path ${currentPath} is not an array (likely an empty directory or just a file).`);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
            const errorItem = document.createElement('li');
            errorItem.textContent = `Error loading contents from ${currentPath}: ${error.message}`;
            fileListElement.appendChild(errorItem);
        }
    }

    // Start the process
    fetchFilesRecursively(initialPath);
});