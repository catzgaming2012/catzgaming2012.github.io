document.addEventListener('DOMContentLoaded', () => {
    const owner = 'catzgaming2012'; // Replace with your GitHub username
    const repo = 'catzgaming2012.github.io';   // Replace with your repository name
    const path = 'docs/host'; // Leave empty for the root directory, or specify a subdirectory like 'docs'

    const fileListElement = document.getElementById('file-list');

    async function fetchFiles() {
        try {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
            const data = await response.json();

            if (Array.isArray(data)) {
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.textContent = item.name;
                    link.href = item.html_url; // Link to the file on GitHub
                    listItem.appendChild(link);
                    fileListElement.appendChild(listItem);
                });
            } else {
                console.error('Error: Could not retrieve file list from GitHub API.');
                fileListElement.innerHTML = '<li>Error loading files.</li>';
            }
        } catch (error) {
            console.error('Error fetching files:', error);
            fileListElement.innerHTML = '<li>Error fetching files.</li>';
        }
    }

    fetchFiles();
});