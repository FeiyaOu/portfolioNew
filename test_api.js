// Test script to debug API project creation

const testData = {
  title: 'API Test Project',
  description: 'Testing the API directly',
  category: 'Web Application',
  technologies: ['React', 'Next.js', 'Test Tech'],
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  published: true,
};

console.log('Sending data:', testData);
console.log('Technologies:', testData.technologies);
console.log('Features:', testData.features);

fetch('http://localhost:3000/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData),
})
  .then(response => response.json())
  .then(data => {
    console.log('Response:', data);
    console.log('Returned technologies:', data.technologies);
    console.log('Returned features:', data.features);
  })
  .catch(error => {
    console.error('Error:', error);
  });
