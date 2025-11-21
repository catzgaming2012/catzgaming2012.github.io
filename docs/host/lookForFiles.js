document.addEventListener('DOMContentLoaded', () => {
    const owner = 'catzgaming2012'; 
    const repo = 'catzgaming2012.github.io'; 
    const initialPath = 'docs/'; 
    const baseUrl = `https://${owner}.github.io/`;
    const fileListElement = document.getElementById('file-list');

    function constructWebUrl(fullPath) {
        let sitePath = fullPath.replace(new RegExp(`^${initialPath}/?`, 'i'), '');
        
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
                    if (item.type === 'dir') {
                        await fetchFilesRecursively(item.path);
                        continue;
                    }
                    
                    const websiteLink = constructWebUrl(item.path);
                    
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');

                    link.textContent = item.path.replace(new RegExp(`^${initialPath}/?`, 'i'), ''); 
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
    
    // Start loading
    fetchFilesRecursively(initialPath);
});