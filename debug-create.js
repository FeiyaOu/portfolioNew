// Test script to reproduce the project creation issue
const testData = {
  title: 'Debug Test Project',
  description: 'Testing to find the array issue',
  category: 'Web Application',
  technologies: ['React', 'Next.js', 'Debug Tech'],
  features: ['Feature A', 'Feature B', 'Debug Feature'],
  published: true,
  longDescription: 'This is a test project to debug the array issue',
};

async function testCreate() {
  console.log('=== CLIENT SIDE TEST ===');
  console.log('Sending data:');
  console.log('Technologies:', testData.technologies);
  console.log('Features:', testData.features);
  console.log('Full data:', testData);

  try {
    const response = await fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    console.log('\n=== SERVER RESPONSE ===');
    console.log('Response status:', response.status);
    console.log('Returned data:');
    console.log('Technologies:', result.technologies);
    console.log('Features:', result.features);
    console.log('Full result:', result);

    if (result.id) {
      console.log(`\n=== PROJECT ID: ${result.id} ===`);

      // Now fetch it back to see what was actually saved
      const fetchResponse = await fetch(
        `http://localhost:3000/api/projects/${result.id}`
      );
      const fetchedData = await fetchResponse.json();
      console.log('\n=== FETCHED BACK FROM DB ===');
      console.log('Fetched technologies:', fetchedData.technologies);
      console.log('Fetched features:', fetchedData.features);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testCreate();
