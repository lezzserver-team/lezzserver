export const useFilesPage = () => {
  const MDEmptyFiles = `// Step 1: Get a short-lived upload URL
const postUrl = await generateUploadUrl();

// Step 2: POST the file to the URL
const result = await fetch(postUrl, {
method: "POST",
headers: { "Content-Type": selectedImage!.type },
body: selectedImage,
});
const { storageId } = await result.json();`;

  return {
    MDEmptyFiles,
  };
};
