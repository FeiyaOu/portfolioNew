import mammoth from 'mammoth';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to array buffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Convert docx to HTML with base64 images
    const result = await mammoth.convertToHtml(
      { arrayBuffer },
      {
        styleMap: [
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
        ]
      }
    );

    // Process HTML to extract and upload base64 images
    let processedContent = result.value;
    const base64ImageRegex = /<img[^>]*src="(data:image\/(\w+);base64,([^"]+))"/g;
    const images = [];
    let match;
    
    while ((match = base64ImageRegex.exec(processedContent)) !== null) {
      images.push({
        fullMatch: match[0],
        dataUri: match[1],
        extension: match[2],
        base64: match[3]
      });
    }

    // Upload each image to local storage
    for (const img of images) {
      try {
        const base64Data = Buffer.from(img.base64, 'base64');
        
        // Generate unique filename
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const uniqueFilename = `${timestamp}-${randomStr}.${img.extension}`;
        
        // Save to public/blog-images
        const filePath = join(process.cwd(), 'public', 'blog-images', uniqueFilename);
        await writeFile(filePath, base64Data);
        
        // Replace in HTML - need to escape special characters for regex
        const escapedDataUri = img.dataUri.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        processedContent = processedContent.replace(
          escapedDataUri,
          `/blog-images/${uniqueFilename}`
        );
      } catch (imgError) {
        console.error('Error processing image:', imgError);
        // Continue with other images even if one fails
      }
    }

    return Response.json({
      success: true,
      content: processedContent
    });
  } catch (error) {
    console.error('Error processing document:', error);
    return Response.json(
      { 
        error: 'Failed to process document',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

